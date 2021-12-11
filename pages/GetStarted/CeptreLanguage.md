---
title: "The Ceptre Language"
keywords: ceptre
tags: [introduction]
sidebar: mydoc_sidebar
permalink: CeptreLanguage.html
summary: An overview of the key features of a Ceptre program.
---

## Installing Ceptre

You can download the Ceptre command line tool for Windows, macOS, or Linux here: 
https://drive.google.com/drive/folders/0B6BJA78gViuAN3A0WlVkdXBjMk0

Alternatively, you can download the source code and find instructions to build it here: 
https://github.com/chrisamaphone/interactive-lp

To run Ceptre, just run the executable with the source file as an argument. By convention, a 
Ceptre source code file should end with `.cep`. But what is a Ceptre file? Read on! 

## A Ceptre Program

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

Declared inside this block are the *actions* available to the player (FIXME: at that stage?). For 
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

## Running Ceptre

Now, let's run the Ceptre file. Let's suppose the above file is called `blocks_world.cep`, so it 
would be run with the command:
```
./ceptre-bin blocks_world.cep
```
(The exact name of the executable file depends on your operating system.)

After running that, we see this:
```
Ceptre!
block: type.
on block block: pred.
on_table block: pred.
clear block: pred.
arm_holding block: pred.
arm_free: pred.
stage blocks {
forward chaining rule pickup_from_block with 2 free variables...
forward chaining rule pickup_from_table with 1 free variables...
forward chaining rule put_on_block with 2 free variables...
forward chaining rule put_on_table with 1 free variables...
}
#interactive blocks.
a: block.
b: block.
c: block.
context init { (on_table a), (on_table b), (on c a), (clear c), (clear b), arm_free }
#trace ...

0: (quiesce)
1: (pickup_from_table b)
2: (pickup_from_block c a)
?-
```
That's a lot, so let's break it down.

First, Ceptre introduces itself and then introduces the predicates in this file (as explained 
above). Next, it introduces the current stage (FIXME: all stages?):
```
stage blocks {
forward chaining rule pickup_from_block with 2 free variables...
forward chaining rule pickup_from_table with 1 free variables...
forward chaining rule put_on_block with 2 free variables...
forward chaining rule put_on_table with 1 free variables...
}
```
This introduces the actions available at this stage. You can read more about what terms like 
"forward chaining" and "free variables" mean in the (FIXME) section.

After that, Ceptre introduces the objects in our game world and the current state, as described 
above. Then, we see:
```
0: (quiesce)
1: (pickup_from_table b)
2: (pickup_from_block c a)
?-
```
These are the actions available to us. `quiesce` means to enter a stable state where no more 
changes are made. This ends the current execution. Now, recall that in our initial state, block 
a is on the table, block c is on top of a with nothing on top of it, block b is on the table with 
nothing on top of it, and the player's hand is free. So the actions available to us are to pick 
up c off of a or pick up b from the table. Finally, `?-` is our cue to act!

Let's enter `2` to pick up block c from a. Now we see:
```
0: (quiesce)
1: (put_on_table c)
2: (put_on_block c b)
3: (put_on_block c a)
?-
```
The game state has been updated to reflect that we are now holding block c and block a now has 
nothing on top of it. Now, we can put c on the table or on top of a or b, or quiesce. When we enter 
0 to quiesce, we see something like:
```
Final state:
{(arm_holding c), (clear a), (clear b), (on_table b), (on_table a), (stage blocks)}

Trace: 
let [x8, x7] = pickup_from_block c a [x3, [x4, [x6, []]]];
```
This shows us the state of the game world at the end and a trace of the actions we took. (TODO: 
explain trace further) 
