---
title: Ceptre Web Editor Based
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to web editor for ceptre language and run a small hello world program"
sidebar: mydoc_sidebar
permalink: CeptreWebEditorBased.html
folder: Overview
---

## Accessing Ceptre Web Editor
Ceptre web editor can be accessed [here](http://microceptre.glitch.me/)

## Writing a Hello World Program

The "hello world" example of Ceptre (i.e. the smallest complete, runnable program with nontrivial behavior) is a program with two predicates and a single rule. 

1. Start by creating 2 predicates in the editor, naming them ‘a’ and ‘b’ 
    - Click the Lock button after naming the predicates. This locks the predicates from being edited, preventing any accidental edits which could change later fields in the editor.

2. Now create a rule in the editor, naming it ‘rule’
    - Add a new Condition by pressing the + under Conditions, and in the dropdown box, select the predicate ‘a’
    - Add a new Added Effect by clicking the + under Added Effects, and select the predicate ‘b’ from the dropdown menu
    - This rule should replace the predicate ‘a’ with the predicate ‘b’, so check the remove box next to the condition predicate ‘a’ in the rule
    - Now click the Lock button next to the rule’s name to prevent further editing and allow it to be used in execution

3. Finally, create an atom in the initial state by switching tabs to the initial state tab, and clicking the Add Atom button
    - Select ‘a’ from the drop-down menu. 
    - Now click the Duplicate Atom button twice. 
    - Click the Lock button for each of the created atoms. 

## Running a Hello World Program

To run the Ceptre program, click the Start Execution button. You should see something like the following:

The text area labeled States displays the current state, as well as previous states of the program. These describe which predicates are present in the world at any point in the program’s execution.

Each of the options in the selection window labelled ‘Transitions’ corresponds to a different way that the program can evolve, which we call a *transition*. But we only have one rule in our program, so how can it have multiple choices for what to do?

The answer is that we started with an initial state containing *three instances* of the predicate `a`, and each of those instances is considered distinct. So there really are three possibilities for how the rule may fire, corresponding to *which* of the three `a's` is to be replaced.
Select one of the transitions and click the Execute Transition button. Now you should see:

The States text area has updated to show the new state, as well as keeping a record of the rule which was fired to transition between states. Similarly, the Transitions selector has updated for the new program state.

Now click the Execute to Quiescence button. This will select transitions at random until there are no more rules which can fire.


