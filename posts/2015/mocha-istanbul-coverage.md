---
date: '2015-07-06'
title: Getting Mocha coverage reports using Istanbul
description: Here's how to get detailed coverage reports from Mocha via Istanbul.
image: images/mocha-istanbul.png
tags: [JavaScript]
attachments:
  - ./mocha-istanbul-coverage/screenshot.png
book: archive
---

<Figure cover>
<img src='./mocha-istanbul-coverage/screenshot.png' />
</Figure>

This is all you really need to run coverage reports on [Mocha] tests via [Istanbul].

```sh
istanbul cover _mocha
```

### Opening reports

Your reports will be available under `coverage/`. By default, you'll get JSON files and an HTML report.

```sh
open coverage/lcov-report/*.html
```

## Improving your setup

### Locking istanbul

Preferably, though, you'll want to add `istanbul` to your project so you can pin down the version you need and have it available on your CI.

[mocha]: http://mochajs.org/
[istanbul]: https://www.npmjs.com/package/istanbul

```sh
npm install --save-dev istanbul
./node_modules/.bin/istanbul cover _mocha
```

### Adding to gitignore

There's no need to commit the coverage reports.

```sh
echo "/coverage" >> .gitignore
```

### Making an npm task

To make things a bit easier, add a script to your `package.json` to run this. After that, just invoke `npm run coverage`.

<Figure code title='package.json'>

```js
{
  ...
  "scripts": {
    "coverage": "istanbul cover _mocha -- -R spec"
  }
}
```

</Figure>

### Travis integration

If you're using [Travis] to automate your tests, you can also set it up to show coverage reports on your builds. [Looks like this](https://travis-ci.org/rstacruz/ractive-ractive).

<Figure code title='travis.yml'>

```yml
script: npm run coverage
```

</Figure>

[travis]: https://travis-ci.org/
