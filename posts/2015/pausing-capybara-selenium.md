---
date: '2015-11-17'
title: Pausing Capybara tests
tags: [Ruby]
layout: simple
description: Use the web inspector in Capybara/Selenium tests.
---

Want to use the Web Inspector in Capybara/Selenium tests? The first thing you'll probably try is to use [pry-byebug](https://rubygems.org/gems/pry-byebug) to pause your tests. You'll probably find that this doesn't work as intended.

<figure>
<figcaption>A bad example</figcaption>

```rb
scenario 'visiting the home page' do
  visit root_path
  binding.pry # ✗
end
```

</figure>

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

<figure>
<figcaption>spec/support/pause_helpers.rb</figcaption>

```rb
module PauseHelpers
  def pause
    $stderr.write 'Press enter to continue'
    $stdin.gets
  end
end
```

</figure>

<figure>
<figcaption>spec/rails_helper.rb</figcaption>

```rb
RSpec.configure do
  config.include PauseHelpers, type: :feature
end
```

</figure>

### Using Poltergeist

When using Poltergeist (for PhantomJS support), just use its [Remote Debugging](https://github.com/teampoltergeist/poltergeist#remote-debugging-experimental) feature with the `inspector: true` flag.
