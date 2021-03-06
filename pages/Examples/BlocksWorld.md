---
title: Blocks World
summary: ""
sidebar: mydoc_sidebar
permalink: BlocksWorld.html
folder: Examples
---

## Concept
The blocks world is a common scenario used for example problems in AI. It consists of a set of 
stackable blocks on a table and a robot arm that can move them.

![image](https://user-images.githubusercontent.com/42487202/148270116-94f2bb5b-d3b1-4866-89b8-fddc72ada78c.png)

## Add Sets/Types 
The only type (or set, in the web editor) we need for this example is `block`. For this example, 
we’ll have three blocks, that we’ll call `a`, `b` and `c`. Since there is only one arm and one table
in this example, we don’t term to identify them.

Ceptre Text-Based Code:
```
block : type.
a : block.
b : block.
c : block.
```
![image](https://user-images.githubusercontent.com/42487202/155248178-fa73d2a5-2bde-4127-ac8e-c2ad89ec9ebf.png)

## Add Predicates
We’ll need two predicates to describe the state of the arm. The arm can be free, or it can be 
holding a block. We also need predicates to indicate the position of blocks. A block can be on the 
table or on another block. We also need a predicate that indicates that there is nothing on top of a
block. We’ll formalize these as the following predicates:
1. `arm_free`: the arm is not holding anything
2. `arm_holding block`: the arm is holding the block
3. `on_table block`: the block is on table
4. `on block block`: the first block is on top of the second block
5. `clear block`: the block is clear; we can put another block on it

Ceptre Text-Based Code:
```
arm_free : pred.
arm_holding block : pred.
on_table block : pred.
on block block : pred.
clear block : pred.
```
![image](https://user-images.githubusercontent.com/42487202/155248458-880383da-82a9-4104-8cfc-5111885291c3.png)

## Add Stages
There’s only one stage in this example, which we’ll call `blocks`. You can have multiple stages in the ceptre program using command-line tools but if you are using the web editor then it supports just one stage per program. Learn more about [Stages](/Stages_Interactivity.html).
<br>
{% include note.html content="For each rule, we require certain pre-conditions, which when fulfilled generate the defined effects when that rule is fired. Both the pre-conditions (LHS) as well the added effects (RHS) comprise the predicates we have defined before. As we define our rules, we will see that on the application of the rule the initial state is changed to new. If we want to sustain objects in the LHS of the rule we will have to explicitly mention it in RHS which implies that the new state contains that element, or we can use the `$` sign appended to element we expect to be sustained across RHS. We imitate a similar concept in the web editor with the help of the 'Remove' checkbox. By default, the web editor sustains everything from LHS to RHS but if we want something to not be present in our new state we can check the 'Remove' box which ensures the removal of that particular object from the new state after the rule is fired." %}

The player can pick up a block from the table or another block (for mechanical reasons, these are separate actions) and can place a 
block on the table or another block (likewise). Thus, we’ll need the following rules:
1. `Pick up a block from the table` - The block must be on the table and clear and the arm must be free. Afterward, the arm is no longer free; it is holding the block. The block is no longer on the table and is no longer considered clear (for our purposes, a block we’re holding isn’t clear).

    | LHS (Pre-conditions) | RHS (Added Effects) |  
    | -------------------- | ------------------- | 
    | on_table X           | - (Remove)          |
    | clear X              | - (Remove)          |
    | arm_free             | - (Remove)          |
    | -                    | arm_holding X       |
    
    ![image](https://user-images.githubusercontent.com/42487202/155249038-488bd658-c92c-4c4e-9f4c-92889f6547ab.png)

    

2. `Pick up a block from another block` - The top block must be clear and on the bottom block and the arm must be free. Afterward, the arm is no longer free; it is holding the top block. The top block is no longer on the bottom block and no longer clear, while the bottom block is clear.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | on X Y               | - (Remove)          |
    | clear X              | - (Remove)          |
    | arm_free             | - (Remove)          |
    | -                    | clear Y             |
    | -                    | arm_holding X       |
    
    ![image](https://user-images.githubusercontent.com/42487202/155249426-3ab055ca-b567-421f-a6f2-625d9ac52ee3.png)

3. `Place a block on the table` - The arm must be holding the block. Afterward, the arm is no longer holding the block. The block is on the table and clear, and the arm is free.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | arm_holding X        | - (Remove)          |
    | -                    | on_table X          |
    | -                    | clear X             |
    | -                    | arm_free            |
    
    ![image](https://user-images.githubusercontent.com/42487202/155249623-211bf792-27e0-49b0-8ec4-2749da0727e2.png)

4. `Place a block on another block` - The arm must be holding the block and the destination block must be clear. Afterward, the arm is free and no longer holding the block. The destination block is no longer clear. The block that was being held is on the destination block and is clear.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | arm_holding X        | - (Remove)          |
    | clear Y              | - (Remove)          |
    | -                    | on X Y              |
    | -                    | clear X             |
    | -                    | arm_free            |
    
    ![image](https://user-images.githubusercontent.com/42487202/155249771-aa632531-15a7-41da-a60f-a3940d66688d.png)

Ceptre Text-Based Code:
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
#interactive blocks.
```

## Initial State
In our initial state, `a` and `b` are on the table, and `c` is on top of `a`. `b` and `c` are clear, 
and the arm is free.

Ceptre Text-Based Code:
```
context init =
{ on_table a, on_table b, on c a, clear c, clear b, arm_free }
#trace _ blocks init.
```
![image](https://user-images.githubusercontent.com/42487202/155249944-f7e01ecf-aa1c-4e32-90cd-24057c1125d8.png)


## Execution
To run the text-based version of the program, run the executable with the name of your Ceptre file as an argument. For example: `./ceptre-bin BlocksWorld.cep`. The complete code for Blocks World is as follows:
```
block : type.
a : block.
b : block.
c : block.

on block block : pred.
on_table block : pred.
clear block : pred.
arm_holding block : pred.
arm_free : pred.

stage blocks = {
pickup_from_block
  : on X Y * clear X * arm_free -o clear Y * arm_holding X.

pickup_from_table
  : on_table X * clear X * arm_free -o arm_holding X.

put_on_block
  : arm_holding X * clear Y -o on X Y * clear X * arm_free.

put_on_table
  : arm_holding X -o on_table X * clear X * arm_free.
}
#interactive blocks.

context init =
{ on_table a, on_table b, on c a, clear c, clear b, arm_free }

#trace _ blocks init.
```
