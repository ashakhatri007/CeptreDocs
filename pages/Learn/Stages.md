---
title: Stages and Interactivity
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Stages"
sidebar: mydoc_sidebar
permalink: Stages_Interactivity.html
folder: Learn
---

## Definition

In simple terms, 'Stage' can be thought of as named collection of [Rules](Rules.html). Stages help to logically separate the concerns of game. This collection of rules can be executed automatically or by interaction, with or without initial context. 

## Syntax

The basic syntax for defining stage goes in below manner:
```
stage stage_name = {
    rule1 : [...]
    rule2 : [...]
    .
    .
    .
    rulen : [...]
}
```

{% include note.html content="Here 'stage_name' can be replaced by any name that programmer wants to use" %}
The syntax for adding interaction is to wrap all the rules in a stage, then add a `#interactive` directive. Similarly, for the stage that requires an initial state and an initial context we use a `#trace` directive.


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

***Stages - Interactive***
```
stage all_rules = {
    move : at P L * adjacent L L' -o at P L'
}
#interactive all_rules.
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
#trace _all_rules init.
```
{% include note.html content="In trace directive example we use the initial context `init` defined above in Initial state" %}

Ceptre Web Editor Simulation:
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146407727-de91b1f3-7336-447a-bd8d-771533514b0f.mov">
</video>
