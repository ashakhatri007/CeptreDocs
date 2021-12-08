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
 3. trapped - dungeon, secret room (It comprises of all the rooms that Thomas can't interact with until he use the respective key)

https://user-images.githubusercontent.com/42487202/145275866-9cdb9269-a5a4-44bf-9f7e-4409f88ab016.mp4


