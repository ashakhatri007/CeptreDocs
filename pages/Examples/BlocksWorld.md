---
title: Blocks World
tags: [getting_started, troubleshooting]
keywords:
summary: ""
sidebar: mydoc_sidebar
permalink: BlocksWorld.html
folder: Examples
---

## Concept
The blocks world is a common scenario used for example problems in AI. It consists of a set of 
stackable blocks on a table and a robot arm that can move them.

![image](https://user-images.githubusercontent.com/42487202/148270116-94f2bb5b-d3b1-4866-89b8-fddc72ada78c.png)

## Add Sets
The only type (or set, in the web editor) we need for this example is `block`. For this example, 
we’ll have three blocks, that we’ll call `a`, `b` and `c`. Since there is only one arm and one table
in this example, we don’t terms to identify them.

Ceptre Text-Based Code:
```
block : type.
a : block.
b : block.
c : block.
```

## Add Predicates
We’ll need two predicates to describe the state of the arm. The arm can be free, or it can be 
holding a block. We also need predicates to indicate the position of blocks. A block can be on the 
table or on another block. We also need a predicate that indicates that there is nothing on top of a
block. We’ll formalize these as the following predicates:
- `arm_free`: the arm is not holding anything
- `arm_holding block`: the arm is holding the block
- `on_table block`: the block is on the table
- `on block block`: the first block is on top of the second block
- `clear block`: the block is clear; we can put another block on it

Ceptre Text-Based Code:
```
arm_free : pred.
arm_holding block : pred.
on_table block : pred.
on block block : pred.
clear block : pred.
```

## Add Rules
There’s only one stage in this example, which we’ll call `blocks`. The player can pick up a block 
from the table or another block (for mechanical reasons, these are separate actions) and can place a 
block on the table or another block (likewise). Thus, we’ll need the following rules:
- Pick up a block from the table.
  - The block must be on the table and clear and the arm must be free.
  - Afterwards, the arm is no longer free; it is holding the block. The block is no longer on the 
    table and is no longer considered clear (for our purposes, a block we’re holding isn’t clear).
- Pick up a block from another block.
  - The top block must be clear and on the bottom block and the arm must be free.
  - Afterwards, the arm is no longer free; it is holding the top block. The top block is no longer 
    on the bottom block and no longer clear, while the bottom block is clear.
- Place a block on the table.
  - The arm must be holding the block.
  - Afterwards, the arm is no longer holding the block. The block is on the table and clear, and 
    the arm is free.
- Place a block on another block.
  - The arm must be holding the block and the destination block must be clear.
  - Afterwards, the arm is free and no longer holding the block. The destination block is no longer 
    clear. The block that was being held is on the destination block and is clear.

Ceptre Text-Based
```
stage blocks = {
pickup_from_table
: on_table X * clear X * arm_free -o arm_holding X.
pickup_from_block
: on X Y * clear X * arm_free -o clear Y * arm_holding X.
put_on_table
: arm_holding X -o on_table X * clear X * arm_free.
put_on_block
: arm_holding X * clear Y -o on X Y * clear X * arm_free.
}
#interactive blocks
```

## Initial State
In our initial state, `a` and `b` are on the table, and `c` is on top of `a`. `b` and `c` are clear, 
and the arm is free.

Ceptre Text-Based
```
context init =
{ on_table a, on_table b, on c a, clear c, clear b, arm_free }
#trace _ blocks init.
```

## Execution
Now we can run our prototype. To run the text-based version, save the file as `blocks-world.cep` 
and run:
```
./ceptre-bin blocks-world.cep
```
The exact syntax will depend on your operating system.
