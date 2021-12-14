---
title: Pandemic
tags: [getting_started, troubleshooting]
keywords:
summary: "Pandemic is a board game whose mechaics we will define using Ceptre."
sidebar: mydoc_sidebar
permalink: Pandemic.html
folder: Examples
---

## Concept

Pandemic is based on the premise that four diseases have broken out in the world, each threatening to wipe out a region. The game accommodates two to four players, each playing one of seven possible roles: dispatcher, medic, scientist, researcher, operations expert, contingency planner, or quarantine specialist. Through the combined effort of all the players, the goal is to discover all four cures before any of several game-losing conditions are reached.

![pandemic-2013-display](https://user-images.githubusercontent.com/42487202/146022356-c4982efb-2fd1-4184-b465-5dadd5fc3d36.jpg)

## Add Sets

Now we will add the elements we saw in the concept into the project. To start with, Navigate to the Editor Tab of the Ceptre Editor and locate the Sets. Select the option to Add a New Set, a dialogue box will appear from the website which will allow you to name it. 
 Our game world here is made up of 3 sets i.e. city, player and city_card.

 1. city - For the sake of this example, we assume there are 5 cities - atlanta, los_angeles, bogota, kinshasa, delhi.
 2. player - We assume there are 4 players with names - player_a, player_b, player_c, player_d.
 3. city_card - We make 5 cards corresponding to each city i.e. atlanta_card, los_angeles_card, bogota_card, kinshasa_card, delhi_card.

 Cepter text based code:
 ```
numbers : type.

city : type.
atlanta : city.
los_angeles : city.
bogota : city.
kinshasa : city.
delhi : city.

player : type.
player_a : player.
player_b : player.
player_c : player.
player_d : player.

card : type.
atlanta_card : card.
los_angeles_card : card.
bogota_card : card.
kinshasa_card : card.
delhi_card : card.

```

Cepter Web Editor simulation :

<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146030086-df9fd81d-7686-47a4-a0d1-5c17eb4ab813.mov">
</video>


## Add Predicates

In this example we have 6 predicates, note that we lock every predicate after definition so that we don't edit them erroneously post definition:

1. hand - As the name suggests, this state should represent the player having card in hand.
It is composed of two arguments:

    - player: A player who is playing the board game.
    - card: A card corresponding to a city.


2. at - It describes the position of the player.
It is composed of two arguments:

    - player: A player who is playing the board game.
    - city: A city where the player is located currently.


3. turn - In this game world, we decide which player is going to play via a token system. This predicate signifies the token which can be used by player to denote its turn.
It is composed of one argument:

    - player: A player whose turn is next to play the board game.


4. adjacent - This Predicate will indicate which cities are beside each other and once we make the Rules it will allow us to make player only be able to move between cities that are beside each other.
It is composed of two arguments, however they are the same Sets:

    - city: The cities that player will be able to move from and to.

5. city_card - This predicate will indicate the presence of a card corresponding to a city. The player will need a city card to move to that city.
It is composed of two arguments:
    
    - city: A city where player intends to go.
    - card: A card corresponding to city mentioned above.

6. disease - This represents the presence of disease in a city.
It is composed of one argument:

    - city: A city which is ailed by disease.

7. research_center - This represents building of research center at a city by player. This research center is aimed at doing research for disease.
It is composed of one argument:

    - city: A city where player aims to build research center.

Cepter text based code:
```
hand player card : pred.

at player city : pred.

turn player : pred.

adjacent city city : pred.

city_card city card : pred.

disease city : pred.

research_center city : pred.

```

Cepter Web Editor simulation :

<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146036370-e4f196f1-d62a-4bd6-a3f5-dfb8e9925b85.mov">
</video>

## Add Rules

Now we will be adding the rules in which our world will be working on.
First, navigate to the "Add rule" button and select it. A new menu should appear.

After that select the "+" to Add a New condition or effect. For this example we will be making 4 rules. In reality, it is very unlikely that you will be able to know the exact number of rules that you will be needed, which is when the Trial and Error method will most likely be the most useful.


1. ***drive*** - This rule requires three conditions which, as we covered before, are the Predicates we previously made:

    - turn : It is current players turn.
    - at : Current player is located at city.
    - adjacent : Given two cities are adjacent to each other.

Once these conditions are filled, the result of the rule firing would be:

    - at: Current player reaches the adjacent city.

This should roughly read as player have driven to a city which is adjacent to its current location.

Lastly, check the box beside the first and second condition. This will make sure that turn is passed to other player and current player is no longer at its previous location.

2. ***build*** - This rule requires four conditions which, as we covered before, are the Predicates we previously made:

    - turn : It is current players turn.
    - at : Current player is located at city.
    - hand : Player has a city card in its hand.
    - city_card : City Card belongs to corresponding city

Once these conditions are filled, the result of the rule firing would be:

    - research_center : Current player build research center at city.

This should roughly read as player have built a research center at city whose card is present in its hand.

Lastly, check the box beside the first and third condition. This will make sure that turn is passed to other player and current player no longer possess the city card as it was used to build research center at that city.

3. ***fly*** - This rule requires four conditions which, as we covered before, are the Predicates we previously made:

    - turn : It is current players turn.
    - at : Current player is located at city.
    - hand : Player has a city card in its hand.
    - city_card : City Card belongs to corresponding city

Once these conditions are filled, the result of the rule firing would be:

    - at : Current player will be flown to city corresponding to card.

This should roughly read as player flies from its current city to a city whose card it possessed.

Lastly, check the box beside the first, second and third condition. This will make sure that turn is passed to other player, current player's location is changed and current player no longer possess the city card as it was used to fly player to that city.

4. ***treat*** - This rule requires three conditions which, as we covered before, are the Predicates we previously made:

    - turn : It is current players turn.
    - at : Current player is located at city.
    - disease : the city which is ailed by disease

Once these conditions are filled, the result of the rule firing will be just removed the disease from ailing city which can be represented by checking the remove box near disease condition.

This should roughly read as player located at ailing city removes the disease from the ailing city.

Lastly, check the box beside the first and third condition. This will make sure that turn is passed to other player, and disease is removed from ailing city.

{% include note.html content="Note that while adding rules we use variable name instead of constants defined in sets. This is important as we define rules on types and after firing rules, the corresponding constants from initial state are used." %}

Ceptre text based code:
```
stage main = { 

drive : turn P * at P C * adjacent C C' -o adjacent C C' * at P C' * ().

build : turn Player * at Player City * hand Player Card * city_card City Card -o at Player City * city_card City Card * research_center City * ().

fly : turn P * at P C * hand P CityCard * city_card C' CityCard -o city_card C' CityCard * at P C' * ().

treat : turn Player * at Player City * disease City -o at Player City * ().
}
```

Ceptre Web editor simulation for initial 3 rules: 
<video width = "650" controls>
    <source src = "">
</video>


## Initial State

The Initial State is the state of execution your program will begin in.
In this example you only have to think of it in two ways:

The building of your map, which will most likely stay stagnant.
In this case, the rooms (including the locked ones) will not change at all throughout all the "playthrough."

The first position of your elements. These will change in the playthroughs, but when you start the "game" again these elements will go back to the position you put them in.
In this case, the items and Thomas will all start in specific positions, however they will be moved or mutated in the game. Once you start the game again Thomas and the items will go back to their first positions.
With that in mind we will start by making the map.
We'll start by adding the adjacent rooms.

Since we already have some rules to move into certain places (Locked rooms and the exit) we do not have to add them here; however we do need to add the rest of the rooms since the rule that applies to them uses variables (The Move rule).

First we'll select the button "Add Atom."
An atom is just the predicate that we will be using for the Initial State.

For this whole step we will be using the "Adjacent" predicate.

Next we will insert the arguments:

    - Adjacent: Hallway (Rooms) Home library (Rooms).

Note:

This only means that Thomas will be able to go into the Home library, but not from the Home library to the Hallway. To allow them to go back and forward we need to do this rule again, just switching the arguments.


To save time we should also use the button "Duplicate Atom" which, as the name suggests, will make a copy of the atom.
This way we only have to switch the arguments without having to select the predicate again.

Ceptre text base code:

```
context init = 
{
    adjacent hallway home_library, 
    adjacent home_library hallway,
    adjacent home_library master_bedroom,
    adjacent master_bedroom home_library,
    adjacent master_bedroom main_room,
    adjacent main_room master_bedroom,
}.
```
Ceptre Web editor simulation: 
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/145315795-95935cb0-f0f0-436e-ad87-9632c5bbdac1.mov">
</video>


Similarly we will be putting all the elements in their place, however we know that we will be able to change their original states.

Ceptre text base code:

```
context init = 
{
    adjacent hallway home_library, 
    adjacent home_library hallway,
    adjacent home_library master_bedroom,
    adjacent master_bedroom home_library,
    adjacent master_bedroom main_room,
    adjacent main_room master_bedroom,
    at golden_key master_bedroom, 
    locked thomas dungeon,
    locked metal_key dungeon,
}.

```
Ceptre Web editor simulation: 
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/145320882-b3f5f763-7846-4c66-a69f-d317fe957dc5.mov">
</video>

## Execution

Now we can finally start our prototype and see if it works.
The first thing we need to do is click on "Start Execution", because otherwise the fireable rules won't appear in the box in the Execution tab.

Once we start the execution, we will also be able to see the atoms that we coded before in the States box.


![image](https://user-images.githubusercontent.com/42487202/145321472-1ee3363e-8286-483f-b3eb-8765bf774b23.png)

![image](https://user-images.githubusercontent.com/42487202/145321493-b222eeef-fa26-4407-b57a-c319a5d81602.png)

