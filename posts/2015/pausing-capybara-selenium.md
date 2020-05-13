---
date: '2015-11-17'
title: Pausing Capybara tests
tags: [Ruby]
layout: simple
description: Use the web inspector in Capybara/Selenium tests.
book: archive
---

<Notice archived>

**Update (2019):** This article was written in 2015. Consider avoiding Poltergeist and PhantomJS mentioned in this article; they have since been deprecated.

</Notice>

Want to use the Web Inspector in Capybara/Selenium tests? The first thing you'll probably try is to use [pry-byebug](https://rubygems.org/gems/pry-byebug) to pause your tests. You'll probably find that this doesn't work as intended.

<Figure code title='A bad example.rb'>

```rb
scenario 'visiting the home page' do
  visit root_path
  binding.pry # ✗
end
```

</Figure>

Using `binding.pry` will halt everything, making your browser not load anything because Rails can't respond to the request.

## A better alternative

A better alternative is to use `$stdin.gets`. This is what [Poltergeist](https://rubygems.org/gems/poltergeist) uses to pause execution. That method is not available in Capybara/Selenium though, so you'll need to add it in yourself:

```rb
$stderr.write 'Press enter to continue'
$stdin.gets
```

## Using with other libraries

### Using with RSpec

If you're using Capybara with Rspec, you can turn this into a helper. You can then just use `pause` in your tests.

<Figure code title='spec/support/pause_helpers.rb'>

```rb
module PauseHelpers
  def pause
    $stderr.write 'Press enter to continue'
    $stdin.gets
  end
end
```

</Figure>

<Figure code title='spec/rails_helper.rb'>

```rb
RSpec.configure do
  config.include PauseHelpers, type: :feature
end
```

</Figure>

### Using Poltergeist

When using Poltergeist (for PhantomJS support), just use its [Remote Debugging](https://github.com/teampoltergeist/poltergeist#remote-debugging-experimental) feature with the `inspector: true` flag.
