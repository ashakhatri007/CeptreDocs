---
title: Types
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Types"
sidebar: mydoc_sidebar
permalink: Types.html
folder: Learn
---

## Definition

Types classify objects in the simulation. Every object has a type, and predicates can only take 
objects of certain types as arguments.

There are multiple ways to define a type. One way is to simply list all members of the type. The 
Ceptre Web Editor *only* supports this way of defining types, and refers to types defined this way 
as *sets*. Another way is to define types inductively as the result of some *function* on some base 
object. This is necessary to define infinite types. For example, the natural numbers can be defined 
as follows: zero is a natural number, and the successor of a natural number is a natural number. 
Types can also be defined by association with some other type.

## Syntax

A type is defined as follows:
```
<type_name> : type.
```

By convention, type names usually start with a lowercase letter. Members of types can be defined in 
the following ways:
```
<object_name> : <type_name>.
<function_name> <input1_type> [<input2_type ...] : <output_type>.
```
The first line simply defines an object of a certain type. The second line defines a function, the 
types to be passed to the function, and the type the function yields.

## Examples
This example defines two types, `player` and `location`, with exactly two members each:
```
player : type.
player1 : player.
player2 : player.

location : type.
a : location.
b : location.
```

This is how to define natural numbers inductively, as above. `z` is zero and `s` is the successor 
function:
```
z : num.
s num : num.
```
