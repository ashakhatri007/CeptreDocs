---
title: Backward-Chaining Predicates
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - 
Backward-Chaining Predicates"
sidebar: mydoc_sidebar
permalink: BackwardChaining.html
folder: Learn
---

## Definition
*Backward-chaining* predicates represent persistent facts about the simulation. Backward chaining 
predicates are accompanied by a set of rules for when that predicate holds. When a backward-chaining
predicate appears as the condition of a rule, Ceptre will search backwards from that condition 
through those rules and try to find a proof of it.

For example, we can define natural number addition as follows:
- Zero plus any number equals that number
- For natural numbers `m`, `n`, and `p`, if `m + n = p`, then `succ(m) + n = succ(p)`

To find a proof that `x + y = z`, Ceptre will try to find numbers `m`, `n`, and `p` such that the 
successor of `m` is `x`, the successor of `p` is `z`, and `m + n = p`. It continues to search 
backwards until it reaches the base case `0 + n = n`. We can prove 2+2=4 as such:
1. 2+2=4 if 1+2=3
2. 1+2=3 if 0+2=2
3. 0+2=2 by definition

Our proof is successful.

## Syntax
A backward-chaining predicate is declared as follows:
```
<predicate_name> [<param1_type> <param2_type> ...] : bwd.
```
Like other predicates, the name should start with a lowercase letter.

Backward-chaining rules are written as follows:
```
<rule_name> : <predicate> [<params>] [<- <condition_predicate> [condition_params]].
```
Some rules just assert that certain instantiations of a predicate hold. For instance, a natural 
number plus zero equals itself; this rule does not have any conditions. Other rules have 
conditions, such as the successor rule for addition above. We write the condition second to reflect 
the backward-chaining nature of these rules; Ceptre starts from the conclusion and tries to prove 
the condition. Backward-chaining rules are usually named with the corresponding predicate, a slash, 
and then some identifier. For example, our rules for addition could be named `plus/z` and `plus/s` 
because they concern zero and the successor function, respectively.

## Example
This is the addition example we mentioned above written in Ceptre:
```
plus nat nat nat : bwd.
plus/z : plus z N N.
plus/s : plus (s N) M (s P).
       <- plus N M P.
```
