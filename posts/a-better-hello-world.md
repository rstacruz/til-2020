---
title: A better Hello World
date: '2017-09-19'
# description: "Hello world programs aren't as useful today as they were before. Here's what I propose..."
# tags: [Development]
---

## A better <br> "Hello World"

<!-- {.-large} -->

The "Hello world" program is usually the first introduction to any programming language. It demonstrates the minimum amount you need to write a C program. It looks like this in the C programming language:

```c
/* hello.c */
#import <stdio.h>

int main(int argc, char *argv[]) {
  printf("Hello, world!");
  return 0;
}
```

### In modern times

In more modern languages however, this example isn't as useful anymore. Here's the same example in Python:

```py
# hello.py
print "Hello, world!"
```

<next-block title="Let's improve on this."></next-block>

## A better hello world

In today's world of more succint programming languages, we need a different "hello world" to demonstrate language features better. Here's what I propose:

```js
// hello.js
function getGreeting(name) {
  return `Hello, ${name}!`
}

const message = getGreeting('world')
console.log(message)
```

### How is this better?

This simple example demonstrates a few more things than printing strings, such as:

- How to write a function with an argument
- Returning values from functions
- How to use variables
- The naming convention for functions (camelCase versus snake_case)
- String concatenation
- Comments

<next-block title="Let's look at some more examples."></next-block>

## More examples

### Go version

I've started writing these kinds of programs for languages that I'm learning. Here's how it'd look like in Go, which I've added to my [Go cheatsheet](https://ricostacruz.com/cheatsheets/go):

```go
// hello.go
package main

import "fmt"

func main() {
  message := getGreeting("world")
  fmt.Println(message)
}

func getGreeting(name string) (string) {
  return "Hello, " + name + "!"
}
```

### Elixir version

Here's an Elixir version, also at the [Elixir cheatsheet](https://ricostacruz.com/cheatsheets/elixir):

```elixir
# hello.exs
defmodule Greeter do
  def get_greeting(name) do
    "Hello, " <> name <> "!"
  end
end

message = Greeter.get_greeting("world")
IO.puts message
```
