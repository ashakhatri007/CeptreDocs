---
title: Predicates
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Predicates"
sidebar: mydoc_sidebar
permalink: Predicates.html
folder: Learn
---

## Definition

Predicates are statements about the state of the simulation. A predicate can have 0 or more 
*parameters*. 0-parameter (*nullary*) predicates are simple statements about the world, not 
relating to any object. 1-parameter (*unary*) predicates usually describe properties of objects. 
Predicates with 2 or more parameters usually describe relationships between objects. Parameters 
have to have a specific type, as described above.

## Syntax

A predicate is defined as follows:
```
<predicate_name> [<param1_type> <param2_type> ...] : pred.
```
By convention, predicate names should start with a lowercase letter.

## Example

These are examples of nullary and unary predicates concerning a robotic arm. For the sake of this 
example, we assume that there is only one arm in the simulation, so no parameter is necessary to 
identify it. The first predicate says that the arm isn’t carrying anything, while the second says 
that the arm is holding a particular `block`.
```
arm_free : pred.
arm_holding block : pred.
```

These are two examples of binary predicates. Note that the parameters don’t have to be in any 
specific order, as long as the order is consistent throughout the program. However, it is helpful to 
have parameters in the order they would be in when the predicate is read in natural language. For 
example, the first predicate above could be straightforwardly read as “`player` is `at` `location`”. 
The second could be read as “first `location` is `adjacent` to second `location`”.
```
at player location : pred.
adjacent location location : pred.
```
