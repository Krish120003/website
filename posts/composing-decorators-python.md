---
title: Composing Decorators in Python
date: "2024-04-04"
description: "An experiment in abusing syntactic sugar"
---

While implementing a [PEG](https://www.wikiwand.com/en/Parsing_expression_grammar) parser, my friend and I stumbled upon a weird-looking yet valid Python program. It looked something like this:

```python
def foo():
    print("Hello, World!")


def bar():
    return foo


def baz():
    return bar


baz()()()
```

What we have here is something similar to a [Closure](<https://www.wikiwand.com/en/Closure_(computer_programming)>). It's a way to use first-class functions to somewhat "bind" a function and an environment together. After a bit of thought, I realized that this is very similar to Python's [decorators](https://docs.python.org/3/glossary.html#term-decorator).

## Python's @decorators

Here's an example of a function decorator in action:

```python
def stringify(f):
    """
    Decorator that converts the output of a function to a string.
    """

    def inner(x):
        return str(f(x))

    return inner


@stringify
def square(x):
    """
    Returns the square of x as a string.
    """
    return x * x


result = square(4)
```

```python
>>> result
'16'
```

In the snippet above, we use the `stringify` decorator to convert all output of the `square` function to a string.

This seems like a helpful way to organize code, but this got me wondering - can I stack multiple decorators? Turns out you can! Here's an example:

```python
def double(f):
    """
    Decorator that doubles the output of a function.
    """

    def inner(x):
        return f(x) * 2

    return inner


def stringify(f):
    """
    Decorator that converts the output of a function to a string.
    """

    def inner(x):
        return str(f(x))

    return inner


@double
@stringify
def square(x):
    """
    Returns the square of x as a string.
    """
    return x * x


result = square(4)
```

```python
>>> result
'1616'
```

With this new `double` decorator applied, we repeat the string `'16'` twice - getting `'1616'` as the output. We can also switch the order of the decorators around to get `'32'` as the output. Python's decorator's are applied closest-to-function first.

![A visual representation of the decorator stack](/assets/decorators/stacking.png)

But.... what if I want to decorate my decorators?

## Decorating the decorators

Knowing I can stack decorators, I wanted to make decorators for decorators. This ended up looking something like this:

```python
def stringify(wrapper):
    # we need to get the function f, and the input x
    def s(f):
        f = wrapper(f)

        def t(x):
            result = str(f(x))
            return result

        return t

    return s

@stringify
def double(f):
    def d(x):
        return f(x) * 2

    return d
```

This seems like a lot of work just to decorate decorators - what if I wanted to decorate the `stringify` decorator? These decorators that are supposed to help soon become lots of boilerplate to manage.

## Composition to the rescue

One of my favourite features from Haskell and functional programming is [function composition.](https://wiki.haskell.org/Function_composition) It's a simple way to "pipeline the result of one function, to the input of another, creating an entirely new function".

There's a solution by using the `functools.reduce` function to create a [simple compose function](https://stackoverflow.com/questions/16739290/composing-functions-in-python) to easily compose multiple functions down to a decorator.

```python
@compose(increment, double, stringify)
def foo(x):
    return x * x
```

While this optimally solves the problem, the syntax just doesn't look quite as appealing as the Haskell version. So instead, I implemented this simple class to let me use the `+` operator to compose together a decorator.

```python
class Compose:
    def __init__(self, f=None):
        self.f = f if f else lambda x: x
    def __add__(self, other):
        return Compose(lambda x: other(self.f(x)))
    def __call__(self, f):
        return lambda x: self.f(f(x))

decorate = Compose()

def double(x):
    return x * 2

def stringify(x):
    return str(x)

def increment(x):
    return x + 1

@(decorate + increment + double + stringify)
def foo(x):
    return x * x
```

Much better.

## Wrapping up

Decorators are a yet another part of the pile of syntactic sugar in Python. This post covers some niche use-cases for them, and how using some functional programming concepts such as composition can help us write better code.

If you want to learn more about decorators, there's an amazing [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/#a-few-real-world-examples) online.
