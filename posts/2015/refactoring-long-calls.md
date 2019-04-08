---
date: '2015-02-24'
title: Refactoring long calls
tags: [Development]
description: Clean up long code reasonably with these tips.
---

###

<!-- {.-literate-style} -->

Consider seeing this code in a view. It seems a little long, and may be a candidate for refactoring. Lets see how we can make it better.

```ruby
<%=
  event.ticket
    .custom_message
    .to_s.strip
    .gsub("[URL]", site_url)
%>
```

## First attempt

###

<!-- {.-literate-style} -->

One way to rewrite this is to make it as short as possible, ie, store all the complexity in a helper function. In my opinion, this isn't really ideal for the following reasons:

```ruby
<%= custom_message_for(event) %>
```

```ruby
def custom_message_for(event)
  event.ticket
    .custom_messag
    .to_s.strip
    .gsub("[URL]", site_url)
end
```

1. **Same complexity, new location.** The complexity was simply moved from one part to another, instead of broken down into more easily-understandable chunks.

2. **Tight coupling.** The method `custom_message_for` is too tightly coupled. To test this, you will need to create a mock event, with a mock ticket, with a mock custom message.

## Second attempt

###

<!-- {.-literate-style} -->

I would prefer this to be written as a helper that takes in a string, such as so. The view code may be a little longer, but you get these advantages:

```ruby
= format_message(event.ticket.custom_message)
```

```ruby
def format_message(message)
  message.to_s.strip.gsub("[URL]", site_url)
end
```

1. **Simple and obvious.** The method `format_message` is simple and its purpose is immediately obvious.

2. **Understandable at a glance.** Glancing at the view code (`format_message(event...)`), it's apparent how the message is being derived.

3. **Easy testing.** It can be easily tested&mdash;just need to pass it a string.

Another way to implement this is with a presenter, which may not be a bad idea either.
