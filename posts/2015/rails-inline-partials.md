---
date: '2015-02-18'
title: Writing Inline partials in Rails
tags: [Ruby]
description: Organize long views into smaller sub-views with this tip.
book: archive
---

Ever find it difficult to have really long blocks of code in a Rails view?

```haml
- if @list.any?
  - @list.each do |item|
    - # really long code
    - # ...

- else
  - # also long code
  - # ...
```

These blocks can be separated into partials. Alternatively, `Proc.new` can be used to define them inline in one file.

<Figure code>

```ruby
- body, list, empty = nil
```

```ruby
- body = Proc.new do
  - if @list.any?
    - list.call
  - else
    - empty.call
```

```ruby
-# List of items
- list = Proc.new do
  %div
    - @venues.each do |venue|
      = venue
```

```ruby
-# No items available
- empty = Proc.new do
  %div nothing here

- body.call
```

</Figure>
