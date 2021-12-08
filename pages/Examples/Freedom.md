---
title: Freedom
tags: [getting_started, troubleshooting]
keywords:
summary: "Freedom is a video game whose mechaics we will define using Ceptre."
sidebar: mydoc_sidebar
permalink: Freedom.html
folder: Examples
---

## Concept

For freedom, we are going to make a map of game world in which main character "Thomas" is trying to escape a castle by collecting some items. In this rough concept we already have an idea of what the rules of this world will be:
Thomas will only be able to move from one room to another if the rooms are beside each other and if the entrance is open.
We also know which items are needed to be able to advance in the "game", where they are and where they will be needed.

Finally, we also know what the goal is: Escape the castle.
![FreedomConcept](https://user-images.githubusercontent.com/42487202/145275919-8f7e587a-df34-4c05-bcb5-b44b0293b1e5.png)



## Add Sets

Now we will add the elements we saw in the concept into the project. To start with, Navigate to the Editor Tab of the Ceptre Editor and locate the Sets. Select the option to Add a New Set, a dialogue box will appear from the website which will allow you to name it. 
 Our game world here is made up pf 3 sets i.e. elements, rooms and trapped.

 1. elements - thomas, metal_key, golden_key, keypad_code (It comprises of elements in game world)
 2. rooms - hallway, home_library, master_bedroom, main_room, road_home (It comprises of all the rooms that Thomas will be able to move back and forth as well as interact with the items in them)
 3. trapped - dungeon, secret_room (It comprises of all the rooms that Thomas can't interact with until he use the respective key)

 Cepter text based code:
 ```
 numbers : type.

elements : type.
thomas : elements.
metal_key : elements.
golden_key : elements.

rooms : type.
hallway : rooms.
home_library : rooms.
master_bedroom : rooms.
main_room : rooms.
road_home : rooms.

trapped : type.
dungeon : trapped.
secret_room : trapped.

```

Cepter Web Editor simulation :

https://user-images.githubusercontent.com/42487202/145275866-9cdb9269-a5a4-44bf-9f7e-4409f88ab016.mp4

## Add Predicates

In this example we have 4 predicates, note that we lock every predicate after definition so that we dont edit them errorneously post definition:

1. Locked - As the name suggests, this state should represent an element being in a room that they can't get out.
It is composed of two arguments:

    - Element: A character or an item
    - Trapped: A room that cannot be interacted until Thomas has a key.


2. At - This Predicate is similar to the previous one as they both indicate the location of an element, however in this one the elements can move between the rooms.
It is composed of two arguments:

    - Element: A character or an item.
    - Rooms: The rooms that Thomas will be able to move in and out without the need of a key.


3. Equip - In this world we want Thomas to be able to pick up and equip elements that they can use.
It is composed of two arguments:

    - Element: A character or an item. Once we make the rules this element will be Thomas.
    - Element: A character or an item. Once we make the rules this element will be the items that Thomas can pick up.


4. Adjacent - This Predicate will indicate which rooms are beside each other and once we make the Rules it will allows us to make Thomas only be able to move between rooms that are beside each other.
It is composed of two arguments, however they are the same Sets:

    - Rooms: The rooms that Thomas will be able to move in and out without the need of a key.

Cepter text based code:
```
locked elements trapped : pred.

at elements rooms : pred.

equip elements elements : pred.

adjacent rooms rooms : pred.

```
Cepter Web Editor simulation :





