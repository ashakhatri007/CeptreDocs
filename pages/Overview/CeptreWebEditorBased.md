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
    
    <video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/148257087-50f3031b-5a61-4aff-940a-56ed605d945d.mov">
    </video>

2. Now create a rule in the editor, naming it ‘rule’
    - Add a new Condition by pressing the + under Conditions, and in the dropdown box, select the predicate ‘a’
    - Add a new Added Effect by clicking the + under Added Effects, and select the predicate ‘b’ from the dropdown menu
    - This rule should replace the predicate ‘a’ with the predicate ‘b’, so check the remove box next to the condition predicate ‘a’ in the rule
    - Now click the Lock button next to the rule’s name to prevent further editing and allow it to be used in execution

    <video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/148257153-7ab9a003-ddd0-47c0-a048-beebee760592.mov">
    </video>

3. Finally, create an atom in the initial state by switching tabs to the initial state tab, and clicking the Add Atom button
    - Select ‘a’ from the drop-down menu. 
    - Now click the Duplicate Atom button twice. 
    - Click the Lock button for each of the created atoms. 

    <video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/148257203-02dfdf5a-5917-4707-a57d-c00e7f9d6231.mov">
    </video>

## Running a Hello World Program

To run the Ceptre program, click the Start Execution button. You should see something like the following:

![States](https://user-images.githubusercontent.com/42487202/148247870-fefd6923-7026-4162-92a5-33df8e4ba88a.png)

![Transitions](https://user-images.githubusercontent.com/42487202/148247941-899f15d6-4016-43a9-9e4d-2f5231ef1c50.png)

The text area labeled States displays the current state, as well as previous states of the program. These describe which predicates are present in the world at any point in the program’s execution.

Each of the options in the selection window labelled ‘Transitions’ corresponds to a different way that the program can evolve, which we call a *transition*. But we only have one rule in our program, so how can it have multiple choices for what to do?

The answer is that we started with an initial state containing *three instances* of the predicate `a`, and each of those instances is considered distinct. So there really are three possibilities for how the rule may fire, corresponding to *which* of the three `a's` is to be replaced.
Select one of the transitions and click the Execute Transition button. Now you should see:

![Execution_1](https://user-images.githubusercontent.com/42487202/148248002-b6ba3516-d5f7-45d8-a90f-43ea7b0fa4c3.png)

![Execution_2](https://user-images.githubusercontent.com/42487202/148248029-e69e71e6-8445-435d-986c-b2e6712d38b4.png)

The States text area has updated to show the new state, as well as keeping a record of the rule which was fired to transition between states. Similarly, the Transitions selector has updated for the new program state.

Now click the Execute to Quiescence button. This will select transitions at random until there are no more rules which can fire.

## Saving / Retrieving program state
You can save or retrieve ceptre program by using "Save Program" and "Choose File" buttons respectively.

![EditorSave](https://user-images.githubusercontent.com/42487202/148253639-d88494b5-1ea3-41e6-ae8f-2cccb2828d79.png)

Similarly, you can save or retrieve ceptre initial state by using "Save Initial State" and "Choose File" buttons respectively.

![InitialStateSave](https://user-images.githubusercontent.com/42487202/148253685-ca344351-3bec-40e8-9b5c-d5e79eed18b5.png)

