---
title: Ceptre Text Based
tags: [getting_started, troubleshooting]
keywords:
summary: "In this section we introduce the basic programming constructs of the Ceptre language and 
run a small 'Hello World!' program"
sidebar: mydoc_sidebar
permalink: CeptreTextBased.html
folder: Overview
---

## Installing Ceptre
You can download the Ceptre command line tool for Windows, macOS, or Linux here: 
https://drive.google.com/drive/folders/0B6BJA78gViuAN3A0WlVkdXBjMk0

## Writing a Hello World Program
The “Hello World” example of Ceptre (i.e. the smallest complete, runnable program with nontrivial 
behavior) is a program with two predicates and a single rule.

Start by creating a new text file called `HelloWorld.cep`. Add these lines to the file:
```
a: pred.
b: pred.
```

This creates two nullary (0-parameter) predicates called `a` and `b`. Now add the following lines:
```
stage main = {
    rule : a -o b.
}
#interactive main
```
A *stage* is a set of rules that can be available in the simulation at a given time. For now, we 
just have one stage called `main` There is a single rule called `rule` that has `a` as a 
precondition and `b` as an effect. Executing `rule` will remove `a` from the simulation state and 
add `b`. The directive `#interactive main` says that the player can choose which rules 
execute in the `main` stage (as opposed to them being chosen by the computer).

Finally, add these lines:
```
context init = {
    a, a, a
}
#trace _ main init
```
This creates a `context` called `init` in which the simulation state consists of three instances of 
`a`. The directive `#trace _ main init` says to start the simulation in the `main`stage with `init`
as the initial state. The first argument is the limit to the number of rules that can be fired; 
`_` means no limit. Congratulations, you now have a Ceptre program!

## Running a Hello World Program
To run the program, run the executable with the name of your Ceptre file as an argument. For example:
```
./ceptre-bin HelloWorld.cep
```

The exact name of the executable will depend on your operating system. You should see something 
like the following:
```
Ceptre!
a: pred.
b: pred.
stage main {
forward chaining rule rule with 0 free variables...
}
context init { a, a, a }
#interactive main.
#trace ...

0: (quiesce)
1: rule
2: rule
3: rule
?-
```

First, Ceptre introduces itself and prints out the input it was given. Then, we have a choice of 
options. Each of the options listed corresponds to a different way that the program can evolve, which 
we call a *transition*. But we only have one rule in our program, so how can it have multiple 
choices for what to do?

The answer is that we started with an initial state containing *three instances* of the predicate 
`a`, and each of those instances is considered distinct. So there really are three possibilities for how 
the rule may fire, corresponding to *which* of the three `a`s is to be replaced.

`?-` is our prompt to act. Enter a number corresponding to one of the actions. Now you should see:
```
0: (quiesce)
1: rule
2: rule
?-
```

Since there are now only two instances of `a` in our state, there are only two instances of 
`rule` we can fire. Keep firing `rule` until there are no instances left to fire. Then you’ll see:
```
Final state:
{qui, b, b, b, (stage main)}

Trace:
let [x4] = rule  [x3, []];
let [x5] = rule  [x1, []];
let [x6] = rule  [x2, []];
```

This shows us the final state of the simulation and a record of how we got there. `qui` stands for 
*quiescence*; that means it’s in a state where no more changes can be made. (You could have 
entered quiescence earlier by choosing the `quiesce` action.)
