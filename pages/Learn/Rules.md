---
title: Rules
summary: "In this page we introduce to basic programming constructs for ceptre language - Rules"
sidebar: mydoc_sidebar
permalink: Rules.html
folder: Learn
---

## Definition

Rules in common terms are basic instructions that run on current or initial knowledge to manipulate the state of the game.

A Ceptre program is a collection of terms, predicates, and rules Σ, along with a specification of an initial state configuration `∆0`. To a first approximation, the execution of this program means repeatedly examining the current state configuration `∆i` (starting with `∆0`), selecting a rule r that applies to a subset `S` of `∆i`, and generating a new `∆i+1` which is `∆i` with `S` replaced by the rule’s consequences `S0`.

## Syntax

In the Ceptre program, the basic rules go in the `main` stage. Users can define specific rules under different stages, but that will be covered in [stages](Stages_Interactivity.html) documentation. 

The basic syntax for defining rules goes in the below manner:

```
rule_name : predicate1 P1 * predicate2 P2 * .... -o predicateA PA * predicateB PB * ...
```

Let's break down the syntax on `-o`, left side constructs are called conditions, and right side constructs are called the effect. So we first set the rule name and use a colon to define that rule. We add [predicates](Predicate.html) that serve as the conditions for the rule to fire. Once those conditions are fulfilled the resulting state called effect is defined by the right side construct. We use predicates to define the resultant effect after the rule fires.

{% include note.html content="We have used '...' in basic syntax, it essentially means there can be 'n' conditions and 'm' effects due to that rule. It depends on the programmer how they want to design their predicates and resultant effects on game state after firing associated rules." %}


## Example

Let's take a simple example where we want to define a rule where player1 is at the location `a` and wants to move at location `b` should be able to move only when locations `a` and `b` are adjacent to each other. For this statement, we define the game mechanics as follows:


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

The above mechanics essentially mean that we have 2 types of objects i.e. player and location. We define 2 predicates i.e. 'at' (denoting players' current location) and 'adjacent' (denoting adjacency between locations). Using these types and predicates we define a rule which moves any player `P` located at `L` to location `L'` only when locations `L` and `L'` are adjacent to each other. The game map defining the initial adjacent locations and player positions will be part of [GameState](GameState.html)

{% include note.html content="In the Ceptre web editor, when we define any rule everything that is present in LHS is essentially retained to RHS hence we click the remove checkbox if we want to remove a specific predicate in the resulting state when that rule is fired. However, in Ceptre command line tools there is no such default retention of predicates from LHS to RHS, so the predicates in RHS are only present in the resultant state." %}

Ceptre Web Editor Simulation:
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146256144-361a58ed-2dff-4b02-b773-f84cbfc92c3c.mov">
</video>