---
date: '2015-11-28'
title: Using factory_bot with custom factories
tags: [Ruby]
description: Do you use an actual factory pattern in Rails? Set up factory_bot to use this factory.
book: archive
---

[Factory Bot](https://github.com/thoughtbot/factory_bot) is great when creating 'presets' of ActiveRecord models. This is all you really need for most simple cases.

```rb
factory :user do
  name { 'John' }
  email { 'john@example.com' }
end
```

```rb
create :user
# same as User.create(name: 'John', email: 'john@example.com')
```

### Using custom factories

At some point however, your models may get too complicated and you may need an actual [factory](https://en.wikipedia.org/wiki/Factory_method_pattern)—a class that constructs an object and performs actions along with it.

```rb
class UserCreator
  attr_reader :user

  def initialize(attrs)
    @user = User.create(attrs)
    @user.profile = Profile.create(@user)
    @user.posts = create_sample_post
  end
end
```

```rb
creator = UserCreator.create(name: 'John')
creator.user
```

### Setting it up (the hard way)

Factory Bot will then consume a class in this manner:

```
user = User.new
user.name = 'John'
user.save!
```

You can set up a `factory_bot` factory to use this by passing a `class` option. You'll have to make your factory implement these methods. This is silly and painful.

```rb
factory :real_user, class: 'UserCreator' do
  ...
end
```

```rb
create(:real_user).user
```

## Even easier

Why not use the [attributes_for](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Using_factories) helper instead?

```rb
UserCreator.create attributes_for(:user)
```

### Also see

Also see the [Factory Bot cheatsheet](http://devhints.io/factory_bot), along with other cheatsheets from my [cheatsheets](https://devhints.io/) archive.
