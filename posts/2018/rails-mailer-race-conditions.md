---
title: Rails mailer conventions are silly
date: '2017-06-06'
# tags: [Ruby]
# description: Typical Rails convention will tell you to send email like using the ActiveMailer API like so. This is not a very good idea, and let me tell you why.
tags: [Ruby, Rails]
---

Typical Rails convention will tell you to send email like using the ActiveMailer API using `#deliver_later`. This is not a very good idea, and let me tell you why.

```ruby
NotificationMailer.notification(@user, @post).deliver_later
```

### Sample implementation

This kind of mailer would typically be implemented like so:

```ruby
class NotificationMailer < ApplicationMailer
  def notification(user, post)
    @user = user
    @post = post

    mail to: @user.email,
         subject: "You've got a notification"
  end
end
```

<next-block title="Let's look at how this can cause problems."></next-block>

## Race condition!

If you follow Rails best practices, you'd be using `#deliver_later` to send email in the background. This is great for performance, but that means you have to start thinking asynchronously. The code above is written in a very synchronous style and will fail in certain conditions. Consider this scenario:

- A notification is triggered for user Joe, who is `joe@example.com`, by creating a new `Post`.
- A background job is created.
- Before an email could be sent, the `Post` is deleted.
- The mailer now fails because `@post` is nil.

<next-block title="So how can we fix this?"></next-block>

## Think asynchronously

Instead of passing Rails models or record ID's, pass a fully-loaded _plain hash_ of everything the mailer needs to send the email. Consider something like this instead:

```ruby
NotificationMailer.notification(
  user: {
    email: @user.email
  },
  post: {
    id: @post.id,
    title: @post.title,
    url: post_url(@post)
  }
).deliver_later
```

The mailer will now not need to hit the database to fetch any data, eliminating any race conditions. Even if the post is modified or deleted later on, the email will still send just fine.
