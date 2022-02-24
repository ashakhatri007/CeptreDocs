---
title: "Introduction"
sidebar: mydoc_sidebar
permalink: Introduction.html
summary: These brief instructions will help you get introduced to the ceptre. The other topics in this website will help you to go deep down on specific areas.
---

## What is Ceptre?

Ceptre is a *linear logic programming language* created by [Chris
Martens](https://sites.google.com/ncsu.edu/cmartens){:target="_blank"}. It can be used to specify evolving
systems with lots of independent parts concisely. Ceptre is a rule-based specification language that uses
logic to represent the rules of a system. A Ceptre program
represents system states (configurations) as multisets of logical
predicates and defines rules that can manipulate those multisets,
replacing certain facts with others. The structure of a Ceptre
program consists of the type and predicate definitions, an unordered
set of rules, and a description of the initial state.

Linear logic programming at a glance means writing rules of the form

```
a * b * c -o d * e
```

that specify state transitions on a component-wise basis: this rule says
that if our state contains an `a`, a `b`, and a `c`, then we can replace
that part of the state with `d` and `e`.

## Medium of Usage

There are two mediums of using ceptre viz Command Line tools and Web Editor. Refer to [Ceptre Command Line](/CeptreTextBased.html) and [Ceptre Web Editor](/CeptreWebEditorBased.html) Hello world programs to get your development environment ready. It should be noted that Ceptre Web Editor provides a subset of functionality compared to command-line tools. If you are someone who is programming at an advanced level we recommend using ceptre command-line tools whereas if you are someone who is just exploring and want to get started then Web editor will be your best bet!

![Ceptre2Mediums](https://user-images.githubusercontent.com/42487202/153968077-7cccaa02-4348-48db-b10f-23853f54b7bb.png)

## Example 

Let us try to use the symbols `*` and `-o` described above over a real-world example.

In the predator/prey model, there could be a rule `rabbit_grow_mature: rabbit young -o rabbit mature` which requires a young rabbit as a
condition, which is replaced by a mature rabbit.

Ceptre’s types describe the domains over which program
terms can range. Terms represent the nouns in the language or
the objects we want to refer to in predicates. In the ecological
predator/prey model, we will use two types i.e. age, and hunger,
representing age and hunger for the animals in the simulated
system. We represent three ages (young, mature, and old)
and two hunger levels (hungry and sated) to represent the
states of individuals in the population that the rules modify.
Predicates can represent additional information about types,
or information that is true in the world. For example, in
an ecological predator/prey model, there could be a predicate
rabbit age, denoting a rabbit’s age.
