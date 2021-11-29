---
title: "The Ceptre Language"
keywords: ceptre
tags: [introduction]
sidebar: mydoc_sidebar
permalink: index.html
summary: An overview of the key features of a Ceptre program.
---

To understand the Ceptre language, let's look at an example of a Ceptre program. This program is a 
representation of the *blocks world*, a common example problem used in AI that consists of stacks 
of blocks that can be moved.

```
block : type.

on block block : pred.
on_table block : pred.
clear block : pred.
arm_holding block : pred.
arm_free : pred.

stage blocks = {
pickup_from_block
  : on X Y * clear X * arm_free -o clear Y * arm_holding X.

pickup_from_table
  : on_table X * clear X * arm_free -o arm_holding X.

put_on_block
  : arm_holding X * clear Y -o on X Y * clear X * arm_free.

put_on_table
  : arm_holding X -o on_table X * clear X * arm_free.
}
#interactive blocks.

a : block.
b : block.
c : block.

context init =
{ on_table a, on_table b, on c a, clear c, clear b, arm_free }


#trace _ blocks init.
```

We'll break it down piece by piece.

## Types

The first line:
```
block : type.
```
declares a *type* called `block`. A type is a classification of object that exists in the game 
world.

## Predicates

After the declaration of the `block` type, predicates are declared. A *predicate* is a statement
about the game world. Predicates can have parameters, which indicate what objects they are making a
statement about. For example, the line:
```
on block block : pred.
```
declares a predicate called `on` that expects two `block`s as parameters. This represents the first
block being on top of the second block. Other predicates are declared in a similar manner. Note 
that the predicate `arm_free` does not have any parameters. This predicate is a general statement 
about the game world (specifically, that the player is not holding anything), and does not concern 
any specific object.

## Actions

After the predicates is a block that begins with:
```
stage blocks = {
```
TODO: explain stage

Declared inside this block are the *actions* available to the player (TODO: at that stage?). For 
example:
```
pickup_from_block
  : on X Y * clear X * arm_free -o clear Y * arm_holding X.
```
After the name of the action and the colon, there are two lists of predicates separated by the `*` 
operator. The two lists are separated by the `-o` (called the lollipop or lolli) operator. The 
first list is the *preconditions* of the action, things that must be true for the action to be 
available to the player. The second list is the *effects* of the action. In this case, to perform 
the `pickup_from_block` action, block `X` must be on top of block `Y`, there must not be any block 
on top of `X`, and the player's arm must be free. After picking up `X`, there is no longer a 
block on top of `Y` and the player is holding `X`. Note actions remove their preconditions from 
the game state unless they are explicitly re-added as effects. Thus, performing 
`pickup_from_block` also implicitly means that `X` is no longer on top of `Y`, that `X` is no 
longer clear (because we can't put a block on top of a block we're holding), and the player's 
arm is no longer free.

Most action definitions use *variables*, symbols that can stand in for any object of the 
appropriate type. The type of a variable is determined by the predicates it is used with; in 
this example, `X` and `Y` both have to be `block`s because `on`, `clear`, `arm_free`, and 
`arm_holding` accept arguments of type `block`. When the player performs `pickup_from_block`, 
`X` and `Y` can be any blocks that satisfy the preconditions.

## Making It Interactive

(TODO: need to explain stages more first; what is an example of a stage that isn't interactive?)

## Objects

Next we declare the objects that exist in the game world. The lines:
```
a : block.
b : block.
c : block.
```
declare three `block`s called `a`, `b`, and `c`.

## The State of the World

The next line is
```
context init =
```
(TODO: explain context)

We call this context `init` because it is the initial state of the game world. The game state is a 
collection of predicates with their parameters replaces with objects. The line
```
{ on_table a, on_table b, on c a, clear c, clear b, arm_free }
```
indicates that at the start, `a` is on the table, `b` is on the table and nothing is on top of it,
`c` is on top of `a` and nothing is on top of it, and the player's arm is free.

(TODO: explain trace)
