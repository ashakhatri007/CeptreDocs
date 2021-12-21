---
title: Types and Terms
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Types"
sidebar: mydoc_sidebar
permalink: TypesAndTerms.html
folder: Learn
---

## Definition
*Terms* are essentially the “objects” in the simulation, and *types* are classifications of terms. 
Types do not have properties or methods like in object-oriented languages; they are just categories.
Terms can be defined directly or in terms of other terms. The latter kind of term can be thought of 
as a “function” whose output is a unique term. This kind of term allows types to be defined 
inductively. For example, the natural numbers can be defined as consisting of zero and the successor 
of any natural number.

Note that the Ceptre web editor *only* supports simple terms. The web editor refers to types as 
*sets* because they are defined by simply listing the terms.

## Syntax
Types and terms are defined as follows:
```
<type_name> : type.
<term_name> [<param1_type> <param2_type> ...] : <type>
```
By convention, type and term names should start with a lowercase letter. Terms without parameters 
are simple terms, as described above. Terms with parameters must specify the types of those parameters.


## Examples
This example defines two types, `player` and `location`, each consisting of two terms:
```
player : type.
player1 : player.
player2 : player.

location : type.
a : location.
b : location.
```

This is how to define natural numbers inductively, as above. `succ` refers to the successor of a number:
```
zero : num.
succ num : num.
```

This is an example of defining city cards in the board game Pandemic by associating them with 
cities. We first define the `city` type, then define a `card` as the `city_card` of a `city`:
```
city : type.
atlanta : city.
los_angeles : city.
[...]

card : type.
city_card city : card.
```
