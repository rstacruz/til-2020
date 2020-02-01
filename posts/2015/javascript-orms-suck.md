---
date: '2015-02-15'
title: JavaScript ORM's suck
tags: [JavaScript]
description: Database ORM's and JavaScript aren't a good mix. Here's why.
layout: simple
---

> **Update (Dec 2019):** Node.js now supports [top-level await](https://v8.dev/features/top-level-await) which would solve the pain point outlined in this article. This article was written in 2015 with Node.js v0.12 in mind.

Consider this scenario: there's a strange bug in production's data that you need to inspect. In Rails, you can tell `rails console`: "show me all project IDs that are active and made by users that never logged in" like so:

```ruby
pry(main)> User.where(last_signed_in: null)
  .map { |u| u.projects.active }
  .flatten
  .pluck :id
```

This may not be the most efficient way to do it, but some situations are urgent and will call for one-offs like these.

In Node.js, you'll probably do something like this:

```js
> User.where({ last_signed_in: null })
  .fetch().then(function (users) {
    return Promise.all(users.map(function(u){
      return u.projects.active.fetch();
    }))
  })
  .then(function(projects) {
    return projects.map(function(p) {
      return p.id;
    });
  })
  .then(console.log)
```

Ah, granted that promises and ES6 (fat arrows) would make this better, but still...
