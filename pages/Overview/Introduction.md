---
title: "Introduction"
keywords: ceptre
tags: [introduction]
sidebar: mydoc_sidebar
permalink: introduction.html
summary: These brief instructions will help you get introduced with the ceptre. The other topics in this website will help you to go deep down on specific topics.
---

## What is Ceptre?

Ceptre is a *linear logic programming language* created by [Chris
Martens](https://sites.google.com/ncsu.edu/cmartens). It can be used to specify evolving
systems with lots of independent parts in a concise way. Ceptre is a rule-based specification language which uses
logic to represent the rules of a system. A Ceptre program
represents system states (configurations) as multisets of logical
predicates and defines rules that can manipulate those multisets,
replacing certain facts by others. The structure of a Ceptre
program consists of type and predicate definitions, an unordered
set of rules, and a description of the initial state.

Linear logic programming at a glance means writing rules of the form

```
a * b * c -o d * e
```

that specify state transitions on a component-wise basis: this rule says
that if our state contains an `a`, a `b`, and a `c`, then we can replace
that part of the state with `d` and `e`.

This style of programming becomes more useful when we can write *rule
schema* like

```
arm_holding A * clear B -o on A B * clear A * arm_free
```

where `A` and `B` *range over* entities in the world we are simulating. (By
convention, Ceptre uses capital letters as variables that may range over
all appropriately-typed entities.)

## How does Ceptre work?

In Ceptre, simulation states are represented by multisets of
ground predicates. These multisets contain all the information
that is true in the current simulation state. Using these multisets,
the simulation is progressed by the use of rules, which change
the state by taking preconditions in the current simulation state,
and replacing the preconditions with new ground predicates
that follow the fixed rule structure. This allows the states to
change constrained by rules set forth by the author.

Describing the rules requires the definition of two symbols:

```
* - tensor and -o - lolli
```
tensor conjoins predicates whereas lolli is the transition operator 

## Example 

Let us try to use the symbols `*` and `-o` described above over a real-world example.

In the predator/prey model,there could be a rule `rabbit_grow_mature :rabbit young -o rabbit mature` which requires a young rabbit as a
condition, which is replaced by a mature rabbit.

Ceptre’s types describe the domains over which program
terms can range. Terms represent the nouns in the language, or
the objects we want to refer to in predicates. In the ecological
predator/prey model, we will use two types, age and hunger,
representing age and hunger for the animals in the simulated
system. We represent three ages (young, mature, and old)
and two hunger levels (hungry and sated) to represent the
states of individuals in the population that the rules modify.
Predicates can represent additional information about types,
or information which is true in the world. For example, in
an ecological predator/prey model, there could be a predicate
rabbit age, denoting a rabbit’s age.
