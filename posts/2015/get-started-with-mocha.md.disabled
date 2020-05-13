---
date: '2015-02-13'
title: Get started with Mocha testing
tags: [JavaScript]
description: In 60 seconds, let's learn how to write tests for any Node.js package.
---

Testing Node.js packages is easy. Here's the condensed 1-minute guide to setting up tests on a Node.js project.

## Quickstart guide

### Start with a package

<!-- {.-literate-style} -->

Make a `package.json` file if you don't have one yet, then install your weapons of choice.

```bash
npm init
# just keep pressing enter.
# this will create the file `package.json`
```

```bash
npm install --save-dev mocha chai
```

### Write tests

<!-- {.-literate-style} -->

Make your first test file `test/my_test.js`:

```js
/* test/my_test.js */
var expect = require('chai').expect

describe('my test suite', function() {
  it('fails majestically', function() {
    expect(3).to.eql(2)
  })
})
```

### Update scripts

<!-- {.-literate-style} -->

Update your `package.json` to use mocha.

```diff
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "test": "mocha"
  },
```

## Run tests

###

<!-- {.-literate-style} -->

Type `npm test` to run your tests. It should fail. Now go write tests that will pass!

```
  my test suite
    1) fails majestically


  0 passing (17ms)
  1 failing

  1) my test suite fails majestically:

      AssertionError: expected 3 to deeply equal 2
      + expected - actual

      +2
      -3

      test/test.js:5:18: Context.<anonymous>
```

## Learn a bit more

Here's a quick Mocha cheatsheet. Also see [mochajs.org](http://mochajs.org).

```js
describe('test suite', function() {
  beforeEach(function() {
    /*...*/
  })
  afterEach(function() {
    /*...*/
  })

  before(function() {
    /*...*/
  })
  after(function() {
    /*...*/
  })

  it('a basic test', function() {
    /*...*/
  })

  it('a test with a promise', function() {
    return somePromiseObject
  })

  it('an asynchronous test', function(next) {
    if (success) {
      next()
    } else {
      next(error)
    }
  })

  xit('use "xit" for pending tests', function() {
    /*...*/
  })
})
```

## Expectations with Chai

Here's a quick Chai cheatsheet. See [chaijs.com](http://chaijs.com/api/bdd/) for other `expect()`ations.

```js
expect(3).to.eql(2)

expect(obj).to.be.a('string')
expect(obj).to.be.null
expect(obj).to.be.true
expect(obj).to.be.false
expect(obj).to.be.undefined

expect(list).to.include('item')
expect(list).to.have.length(3)
expect(list).to.have.length.gt(0)
```

## Further reading

Use Sinon ([sinonjs.org][sinon]) for mocks.

[mocha]: http://mochajs.org/
[sinon]: http://sinonjs.org/
