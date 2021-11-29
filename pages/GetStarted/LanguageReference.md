---
title: "The Ceptre programming language"
keywords: ceptre
tags: [getting_started]
sidebar: mydoc_sidebar
permalink: LanguageReference.html
summary: This page describes in detail the parts of a Ceptre program.
---

## Declarations

A Ceptre program begins (TODO: does it have to be in this order?) by declaring *predicates*, 
*types*, and *objects* (TODO: terminology?). Predicates are facts about the state of the game 
world. Objects are entities in the game world; they have properties that are described by 
predicates. Types are categories of object; they determine what predicates an object can be used 
with.
(TODO: bwd?)

Declarations in Ceptre follow the format:
```
<name> : <declaration_type>.
```
The possible values of ```<declaration_type>``` are elaborated on below.

### Predicates

A predicate is a statement about the state of the game world. A predicate takes 0 or more 
*arguments*, which are the objects the predicate is making a statement about. A 0-argument 
(nullary) predicate is a simple statement about the world, not concerning any objects. A 1-argument
(unary) predicate is a statement about a property of an object, and a predicate with multiple
arguments is a statement about a relationship between objects.

Predicates are declared as follows:
```
<predicate_name> [<arg_type_1>] [<arg_type_2] [...] : pred.
```
By convention, predicate names start with a lowercase letter. The argument types must be types as 
defined below

### Types

A type is a set of objects. Types are used to determine what objects a predicate can take as 
arguments. Types are declared as follows:
```
<type_name> : type.
```
By convention, type names start with a lowercase letter.

### Objects

An object is an entity in the game world. Every object has a type, and objects can be used as 
arguments to predicates to describe the game world. Objects are declared as follows:
```
<object_name> : <type>.
```
By convention, object names start with a lowercase letter.
(TODO: other ways of defining objects, such as the natural numbers example)

## Initial State

The initial state of the game world is declared as follows:
```
context init = {
    <predicate_1>,
    <predicate_2>,
    ...
}
```
The predicates listed (with arguments) are all those that are true in the initial state of the 
game.
(TODO: explain context further)

## Actions
_Actions_ are what the player can do in the game. An action has a *precondition* a set of 
predicates that must be true for the player to perform the action, and a *postcondition* a set of
predicates that will hold after the player performs the action. Performing the action removes the
predicates in the preconditions from the game state and adds the predicates in the postcondition. 
If a predicate is in both the precondition and postcondition, it is a requirement for the action 
but is not changed by the action.

An action is declared as follows:
```
<action_name> : <preconditions> -o <postconditions>.
```
The preconditions and postconditions are described as follows:
```
<predicate_1> [<arguments>] [* <predicate_2> [<arguments>]] [* <predicate_3> [<arguments>]] [...]
```
The arguments can be objects as defined above or they can be variables. Variables are names that 
can stand in for any object that is of the right type (based on the parameter the variable is used 
as). Variables are unique within action definitions. Thus, two instances of the variable `A` used 
in the same action definition must refer to the same object, but instances of `A` used in other 
action definitions can refer to any object. By convention, variable names start with a capital 
letter.

(TODO: stage main)

(TODO: interactive, trace)
