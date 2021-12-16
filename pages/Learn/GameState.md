---
title: Game State
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Game State"
sidebar: mydoc_sidebar
permalink: GameState.html
folder: Learn
---

## Definition
"Game State" in ceptre refers to the state of gaming system. Programmer can initialize the game with initial state and then the state of game progresses through various states according to the order in which rules are fired.

## Syntax

We define the initial state of game comprising game map and game configuration in `context` construct. The stages that use `#trace _` directive requires a mandatory initial context parameter.

The basic syntax for defining initial state goes in below manner:

```
context context_name{
    predicate1,
    predicate2, 
    .
    .
    .
    predicateN
}
```
{% include note.html content="Here ‘context_name’ can be replaced by any name that programmer wants to use" %}

## Example

Let's take a simple example where we want to define a rule where a player1 is at location `a` and want to move at location `b` should be able to move only when locations `a` and `b` are adjacent to each other. The initial position of player1 is at location `b` and location `b` is adjacent to location `a`. For this statement, we define the game mechanics as follows:

***Types***
```
player : type.
player1 : player.
player2 : player.

location : type.
a : location.
b : location.
```

***Predicates***
```
at player location : pred
adjacent location location : pred
```

***Rules***
```
move : at P L * adjacent L L' -o at P L'
```

***Initial State***
```
context init = {
    at player1 b,
    adjacent b a
}
```

***Stages - Trace***

```
stage all_rules = {
    move : at P L * adjacent L L' -o at P L'
}
#trace _ all_rules init.
```
Ceptre Web Editor Simulation:
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146407727-de91b1f3-7336-447a-bd8d-771533514b0f.mov">
</video>