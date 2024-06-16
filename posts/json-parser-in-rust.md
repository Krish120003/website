---
title: "Parsing JSON in 500 lines of Rust"
date: "2024-06-05"
description: "Finally sitting down to learn Rust and how to write parsers."
hidden: true
---

Last semester at university, I took a course called "Syntax-Based Tools and Compilers". It focused on building a scanner, parser, compiler, and so on for a language called [PL0](https://en.wikipedia.org/wiki/PL/0). We used Python in the course, but I was really interested in learning Rust at the time.

So, I decided to embark on a side project (yes, another one!). This time, I wanted to build a JSON parser in Rust. My goal was to test the skills I gained in the course and finally dive into a Rust project, something I'd been putting off for three years.

## The Plan

I find that there is no better way to learn programming than to just start building. So that was my plan. I found the [JSON specification](https://www.json.org/json-en.html) and started reading. This spec has some really nice diagrams that help visualize the structure of a JSON document.

There are many ways to create a "parser". I could validate, scan, tokenize, and then finally parse the JSON. But I wanted to keep it simple, so I ingored everything and just focused on "parsing" the JSON from a raw text file/string into a Rust enum that represents the JSON structure.

There are tools that can take grammars and autogenerate top-down or bottom-up parsers, but my implementation is something that is considered a **hand-written parser**. It's a flexible method that is not bound to very strict rules or implemenation details, allowing me to make changes easily.

## The Implementation

### How do we represent JSON in Rust?

To store this parsed JSON, I need some way to represent the data in Rust.

I started by creating the general enum `JSONValue` that would represenet the "tree" structure of the JSON document. Each "node" can be of many types - string, number, object, array, boolean, or null. At the root, you have one node that is the JSON object.

I ended up with the following enum:

```rust
#[derive(Debug, Clone, PartialEq)]
enum JSONValue {
    Null,
    True,
    False,
    Number(f64),
    String(String),
    Array(Vec<JSONValue>),
    Object(HashMap<String, JSONValue>),
}
```

### What about errors?

Another thing to note is that parsing is a process that can fail - the source text may have syntax errors and the parser should be able to handle them. So, I decided to return a `Result` type from the parser. If the parsing is successful, it will return the parsed JSON value. If not, it will return an error.

```rust
enum JSONParseError {
    Error(usize),
    NotFound,
    UnexpectedChar(usize),
    MissingClosing(usize),
}
```

I used this enum to represent different types of errors that can occur during parsing. Note that some of these errors have an associated `usize` value; this value is the remaining length of the input string when the error occurred. This lets me know how much of the input string was consumed before the error happened, so I can print better error messages. The `NotFound` error is more of an internal error that I used to indicate that the parser couldn't find the expected element in the input string.

### The JSON "value"

As per the JSON spec, everything starts as an element - which is a value surrounded by whitespace. This value can be of the following types:

- object
- array
- string
- number
- "true"
- "false"
- "null"

#### Simple Values

I wanted to start with the simplest values first, and then build up to the more complex ones. So, I started with the `null` value. A simple function for that looks like this:

```rust
fn null(src: &str) -> Result<(&str, JSONValue), JSONParseError> {
    match src.strip_prefix("null") {
        Some(rest) => Ok((rest, JSONValue::Null)),
        None => Err(JSONParseError::NotFound),
    }
}
```

In this code, we simply check if the input string starts with "null". If it does, we return the remaining string and the `JSONValue::Null`. If not, we return an error indicating that the expected value was not found.

I followed a similar approach for the `true` and `false` values; just replace "null" with "true" or "false".

#### Strings

Parsing strings in a string of JSON sounds simple - just find the opening and closing quotes and return the string in between. But it's not that simple. Strings can contain escape sequences like `\"`, `\\`, `\n`, and so on. So there is careful handling required to parse strings correctly.

To parse a string, the code starts by looking for the opening quotation `"`. After finding it, it reads characters until it finds the closing quotation `"`. However, you can escape the closing quotation, so the parser maintains a flag to check if the last character was an escape character `\`. If it was, the parser handles the next character differently, making sure we don't stop parsing prematurely.

This is part of the code that parses strings:

```rust
fn string(mut src: &str) -> Result<(&str, JSONValue), JSONParseError> {
    // make sure we start with a quote
    match src.strip_prefix("\"") {
        Some(rest) => src = rest,
        None => return Err(JSONParseError::NotFound),
    };

    let mut result: String = "".to_string();
    let mut escaping = false; // the flag
    let mut chars = src.chars(); // iterator

    loop {
        let c = match chars.next() {
            Some(c) => c,
            None => return Err(
                JSONParseError::MissingClosing(src.len())
            ),
        };

        // if we have the \, then we are escaping
        if c == '\\' && !escaping {
            escaping = true;
        }
        // non-escaping closing quote
        else if c == '"' && !escaping {
            break;
        } else if escaping {
            // special escape sequences
            match c {
                // quotation mark
                '"' => result.push('"'),
                ... // other escape sequences
                _ => {
                    // can't escape whatever this is
                    return Err(JSONParseError::UnexpectedChar(
                        chars.count()
                    ));
                }
            }
            escaping = false;
        } else {
            result.push(c);
        }
    }

    Ok((chars.as_str(), JSONValue::String(result)))
}
```

#### Numbers

In normal programming languages, we often have multiple data types to represent numbers, such as integers of different sizes, floating-point numbers, etc. In JSON, there is only one type of number - an arbitary value that can either be an integer, floating-point number, or a number in scientific notation.

For my parser, each number is represented as a `f64` (floating-point number). This is a simple way to represent numbers in Rust, but it does not support the full arbitrary precision that JSON allows. This is a limitation of my parser, but it's one that I'm willing to accept for now.

<!-- json_number.png -->

[![Number](/assets/json-parser-in-rust/json_number.png)](/assets/json-parser-in-rust/json_number.png)

A number in JSON is made up of many parts: the integer, the fraction, and the exponent. The parser reads these parts and constructs a `f64` from them. There are also some edge cases to consider, like leading zeros, negative numbers, and so on.

I won't go into the full implementation here, but I have functions to parse each of those 3 parts, and I combine them to parse the full number.

```rust

fn number(mut src: &str) -> Result<(&str, JSONValue), JSONParseError> {
    let mut result;
    let negative;

    match integer(src) {
        Ok((rest, num)) => {
            result = num.abs() as f64;
            negative = num.is_negative();
            src = rest;
        }
        Err(e) => return Err(e),
    };

    match fraction(src) {
        Ok((rest, frac)) => {
            result += frac;
            src = rest;
        }
        Err(JSONParseError::NotFound) => {}
        Err(e) => return Err(e),
    }

    match exponent(src) {
        Ok((rest, exponent)) => {
            src = rest;

            let multipier = 10_f64.powf(exponent as f64);
            result *= multipier;
        }
        Err(JSONParseError::NotFound) => {}
        Err(e) => return Err(e),
    }

    if negative {
        result *= -1.0;
    }

    Ok((src, JSONValue::Number(result)))
}
```

#### Lists, Objects

Both arrays and objects are collections of values. Arrays are ordered lists of values, while objects are unordered collections of key-value pairs. The parser needs to handle both of these types.

If looking at each of these syntactically, each of these is a collection with elements seperated by commas. For each of these, the parser needs to be able to handle 3 different cases:

- no elements
- one element
- multiple elements

The case of no elements is simple - just find a pair of brackets with whitespace in between.

For the other two cases, we can enter a loop that keeps reading elements as long as the element has a comma after it. This is a simple way to parse these collections. It is still important to note that we cannot skip over elements that are not valid JSON values, so appropriate error handling is required.

Here is what the code for handling the last two cases looks like:

```rust
fn elements(mut src: &str) -> Result<(&str, Vec<JSONValue>), JSONParseError> {
    let mut values = vec![];

    loop {
        match element(src) {
            Ok((rest, v)) => {
                src = rest;
                values.push(v);
            }
            Err(e) => return Err(e),
        }

        // now we wanna consume the first character of src
        // if it is a comma, or break otherwise
        if src.chars().next() == Some(',') {
            src = &src[1..];
        } else {
            break;
        }
    }

    Ok((src, values))
}
```

Again, this isn't the full implementation, but it gives you an idea of how the parser handles these collections.

### Putting the parser together

After building all these pieces, we now come to the root of the parser. When we see JSON used in APIs, it's often used for passing objects around. However, the root JSON object can actually be any of the types we've discussed - a string, number, object, array, boolean, or null.

So, the parser starts by checking which of these types the root JSON value is, and then calls the appropriate function to parse it. This happens in a specific order, as per the JSON spec.

```rust
// the surrounding whitespace has
// already been stripped

fn value(src: &str) -> Result<(&str, JSONValue), JSONParseError> {
    match object(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),
    }

    match array(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),            // if any other error, propogate it up
    }

    match string(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),            // if any other error, propogate it up
    }

    match number(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),            // if any other error, propogate it up
    }

    match bool(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),            // if any other error, propogate it up
    };

    match null(src) {
        Ok(res) => return Ok(res),
        Err(JSONParseError::NotFound) => {} // if not found, that ok
        Err(e) => return Err(e),            // if any other error, propogate it up
    };

    Err(JSONParseError::NotFound)
}
```

This is just a simple flow - just try to parse the root JSON value as each of the types in order. If one of them succeeds, return the result. If none of them succeed, return an error.

With this, the parser is complete. It can parse a JSON string into a Rust `JSONValue` enum in just 500 lines of code. Here's a gist of just this implementation: [https://gist.github.com/Krish120003/369a892ba7189d3b91b91845e60a1ffa](https://gist.github.com/Krish120003/369a892ba7189d3b91b91845e60a1ffa)

## Testing and Performance

I wrote a few unit tests to make sure the parser works as expected. There are a common set of benchmark files for JSON parsers available [here](https://github.com/serde-rs/json-benchmark/tree/master/data). I used the `canada.json` and `twitter.json` files to test the parser. The parser was able to parse these files correctly, so I was happy with the results. The code for testing exceeds the 500 lines, so I didn't include it in the gist.

For performance testing, I found a nice graph on the [yyjson github](https://github.com/ibireme/yyjson) that details JSON reader speeds for different JSON parsers. On `canada.json`, all the parsers achieve a speed under 1 GB/s. My parser was not at all optimized for performance, so I didn't expect it to be fast. Still, I decided to run a very crude benchmark to see how it compared to other parsers.

```rust
let big_file = std::fs::read_to_string("canada.json").expect("Could not read file");

// how many bytes of data?
let num_bytes = big_file.len();

let mul = 1000;
let bytes_to_parse = num_bytes * mul;

let start_time = std::time::Instant::now();
for _ in 0..mul {
    let _ = parse(big_file.as_str());
}
let end_time = std::time::Instant::now();

let bps = bytes_to_parse as f64 / (end_time - start_time).as_secs_f64();

let mbs = (bytes_to_parse as f64) / (1_000_000.0);
let mbps = mbs / (end_time - start_time).as_secs_f64();

let gbs = (bytes_to_parse as f64) / (1_000_000_000.0);
let gbps = gbs / (end_time - start_time).as_secs_f64();

println!("Parsing speed: {:.2} Bytes/s", bps);
println!("Parsing speed: {:.2} MB/s", mbps);
println!("Parsing speed: {:.2} GB/s", gbps);
```

I ran the parser on the `canada.json` file and compared it to the other parsers. With this crude benchmark, my parser was able to parse the file at a speed of around:

```
Parsing speed: 52014622.29 Bytes/s
Parsing speed: 52.01 MB/s
Parsing speed: 0.05 GB/
```

This is not a good speed. But it's still fast enough to parse a large JSON file in under a second. I'm happy with the results, considering I didn't optimize for performance at all. Maybe some day I'll come back and try to make it faster.

## Pretty Errors

Finally, I wanted to make the error messages more readable. Right now, the errors are just enums with a number associated with them. I wanted to make them more human-readable, kind of like Python errors; I wanted to know which specific location in the input string caused the error, and I wanted to print surrounding context to help "debug" the issue.

So, after a bit of tinkering, I was able to use the `usize` values associated with the errors to print out the error message with the surrounding context. This made it much easier to debug issues with the parser.

The approach behind this was to use the size of the leftover source at the time of the error to compute the line number and column number of the error. This was then used to print out the error message with the surrounding context. I also added a pretty arrow to point to the exact location of the error.

```rust
Error: UnexpectedChar(76)
----------------------------------------------------------------
  "age": 30,
  "cars": ["Ford \e This has an invalid escape", "BMW", "Fiat"],
                   ^
                   |
                   |
Error: Unexpected Character on Line 4 Char 19
```

This is a nice way to show the error, and it helped me debug the parser when I was testing it.

## Confusions

I understand most of what is happening in the parser, but I am very confused by a certain phenomenon. When I run the parser on `twitter.json` by doing `cargo run --release`, the parser runs at about 60 MB/s.

But when I run the parser on `twitter.json` by doing `sudo cargo run --release`, the parser runs at about 100+ MB/s. I have no idea why this is happening. Using sudo is significantly increasing the speed for my parser. If you have any idea, please let me know.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">someone needs to explain this to me <a href="https://t.co/IPTEbCM50C">pic.twitter.com/IPTEbCM50C</a></p>&mdash; Krish (@n0tkr1sh) <a href="https://twitter.com/n0tkr1sh/status/1794786108225827309?ref_src=twsrc%5Etfw">May 26, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## The End

This was a fun project to work on. I learned a lot about Rust, parsers, and JSON. I also learned how to write a parser from scratch, which was a great experience. I'm happy with the results, and I'm glad I finally sat down to learn Rust.

The final code is about 800 lines, with all the tests, the benchmark, and the pretty error messages. You can find the full code on my GitHub: [https://github.com/Krish120003/jsonparser/](https://github.com/Krish120003/jsonparser/).

The JSON spec I used is available at [https://www.json.org/json-en.html](https://www.json.org/json-en.html).
