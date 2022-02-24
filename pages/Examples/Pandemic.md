---
title: Pandemic
summary: "Pandemic is a board game whose mechanics we will define using Ceptre."
sidebar: mydoc_sidebar
permalink: Pandemic.html
folder: Examples
---

## Concept

Pandemic is based on the premise that four diseases have broken out in the world, each threatening to wipe out a region. The game accommodates two to four players, each playing one of seven possible roles: dispatcher, medic, scientist, researcher, operations expert, contingency planner, or quarantine specialist. Through the combined effort of all the players, the goal is to discover all four cures before any of several game-losing conditions are reached. We simulate this example with 2 stages hence it will be best executed using command-line tools. We will explain the web editor-based coding constructs as well however we won't be able to run this full example using web editor as the editor doesn't support multiple stages yet. 

![pandemic-2013-display](https://user-images.githubusercontent.com/42487202/146022356-c4982efb-2fd1-4184-b465-5dadd5fc3d36.jpg)

## Add Sets/Types

Our game world here is made up of 3 types/sets i.e. city, player, and card. Learn more about Types and their syntax [here](TypesAndTerms.html).

 1. cities - For the sake of this example, we assume there are 5 cities - atlanta, los_angeles, bogota, kinshasa, delhi.
 2. players - We assume there are 4 players with names - player_a, player_b, player_c, player_d.
 3. card - We make 5 cards corresponding to each city i.e. atlanta_card, los_angeles_card, bogota_card, kinshasa_card, delhi_card.

 Ceptre text-based code:
 ```
cities : type.
atlanta : cities.
los_angeles : cities.
bogota : cities.
kinshasa : cities.
delhi : cities.
players : type.
player_a : players.
player_b : players.
player_c : players.
player_d : players.
card : type.
atlanta_card : card.
los_angeles_card : card.
bogota_card : card.
kinshasa_card : card.
delhi_card : card.
```

<!---Ceptre Web Editor simulation :

<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146030086-df9fd81d-7686-47a4-a0d1-5c17eb4ab813.mov">
</video>-->


## Add Predicates

In this example, we will define the state of simulation with the help of the below-mentioned predicates. Learn more about Predicates and their syntax [here](Predicates.html).

1. `hand` - As the name suggests, this state should represent the player having a card in hand.
It is composed of two arguments:

    - players: A player who is playing the board game.
    - card: A card corresponding to a city.


2. `at` - It describes the position of the player.
It is composed of two arguments:

    - players: A player who is playing the board game.
    - cities: A city where the player is located currently.


3. `turn` - In this game world, we decide which player is going to play via a token system. This predicate signifies the token which can be used by the player to denote its turn.
It is composed of one argument:

    - players: A player whose turn is next to play the board game.


4. `adjacent` - This Predicate indicates which cities are beside each other and once we make the Rules it will allow us to make players only be able to move between cities that are adjacent to each other.
It is composed of two arguments however, they are of the same type i.e. city:

    - cities: The cities that the player will be able to move from and to.

5. `city_card` - This predicate will indicate the presence of a card corresponding to a city. The player will need a city card to move to that city.
It is composed of two arguments:
    
    - cities: A city where the player intends to go.
    - card: A card corresponding to the city mentioned above.

6. `disease` - This represents the presence of disease in a city.
It is composed of one argument:

    - cities: A city which is ailed by disease.

7. `research_center` - This represents building the research center at a city by player. This research center is aimed at doing research for the disease.
It is composed of one argument:

    - cities: A city where the player aims to build a research center.

8. `interact` - This represents an interaction of the current player on their turn. It is a null predicate without any arguments.

9. `change` - This represents the change of turns between players which is automated. It is a null predicate without any arguments.

{% include note.html content="Change and Interact are predicates that indicate what stage should be running. Since Ceptre consumes the predicates, it allows the stage to transition as no other rules in the same stage can fire. Interact predicate is used to force the turn stage to only allow a single rule, and the change predicate is used to prevent the automated turn rotation from becoming an infinite loop." %}

Ceptre text-based code:
```
hand players card : pred.
at players cities : pred.
turn players : pred.
adjacent cities cities : pred.
city_card cities card: pred.
disease cities : pred.
research_center cities : pred.
interact : pred.
change : pred.
```

<!---Ceptre Web Editor simulation :

<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146036370-e4f196f1-d62a-4bd6-a3f5-dfb8e9925b85.mov">
</video>-->

## Add Stages
We have modularized this example into 2 stages i.e. `turn` and `playershift`. Learn more about Stages and their syntax [here](Stages_Interactivity.html). We will add rules for each stage that will define how our game world interacts with its predicates and types. Learn more about Rules and their syntax [here](Rules.html).
<br>
{% include note.html content="For each rule, we require certain pre-conditions, which when fulfilled generate the defined effects when that rule is fired. Both the pre-conditions (LHS) as well the added effects (RHS) comprise the predicates we have defined before. As we define our rules, we will see that on the application of the rule the initial state is changed to new. If we want to sustain objects in the LHS of the rule we will have to explicitly mention it in RHS which implies that the new state contains that element. We imitate a similar concept in the web editor with the help of the 'Remove' checkbox. By default, the web editor sustains everything from LHS to RHS but if we want something to not be present in our new state we can check the 'Remove' box which ensures the removal of that particular object from the new state after the rule is fired." %}

We define stage `turn` as having the below-mentioned rules. These rules are meant to be applied when it is a specific player's turn. We define another stage that governs how the players will change their turns.

1. `drive` - This rule governs the driving capability of the player. The player will be able to drive to a new city given that the city they want to drive to is adjacent to the current city. Assume that player `P` is located at city `C` and on their turn wants to drive to city `C'` which is adjacent to city `C`. When this rule is fired, player `P` loses its turn and is driven to city C'. Note that city C and C' remains adjacent to each other.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | turn P               | - (Remove)          |
    | at P C               | at P C'             |
    | adjacent C C'        | adjacent C C'       |

2. `build` - This rule defines how to build a research center in a city. To build a research center in a particular city, the player should be located in that city and should possess a city card corresponding to that city in their hand. Once the research center is built in that city, the player will no longer possess that city card in their hand hence we need to remove it from RHS.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | turn P               | - (Remove)          |
    | at P C               | at P C              |
    | hand P Card          | - (Remove)          |
    | city_card City Card  | city_card City Card |
    |  -                   | research_center City|

3. `fly` - This rule flies the player from one city to the city whose card player possess in their hand. Player `P` can fly from their current location `C` to location `C'` when they possess a city card of location `C'`. When this rule fires, the player will be relocated to city `C'` and will no longer possess the city card in their hand.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | turn P               | - (Remove)          |
    | at P C               | at P C'             |
    | hand P Card          | - (Remove)          |
    | city_card C' Card    | city_card C' Card   |


4. `treat` - This rule treats the city suffering from a disease. Player `P` can treat disease in city `C` where they are located there. When this rule fires, the city will no longer have the disease, and the player will still be at that location.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | turn P               | - (Remove)          |
    | at P C               | at P C              |
    | disease C            | - (Remove)          |

<!---Ceptre Web editor simulation for rules: 
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146051234-5d74ecd7-62f6-44ad-a2ab-947c3e8800bf.mov">
</video>-->

We define stage `playershift` as having the below-mentioned rules. These rules are required to change the turns between players.

1. `papb` - This rule changes the turn from the player a to player b.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | change               | - (Remove)          |
    | turn player_a        | turn player_b       |

2. `pbpc` - This rule changes the turn from player b to player c.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | change               | - (Remove)          |
    | turn player_b        | turn player_c       |

3. `pcpd` - This rule changes the turn from player c to player d.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | change               | - (Remove)          |
    | turn player_c        | turn player_d       |

4. `pdpa` - This rule changes the turn from player d to player a.

    | LHS (Pre-conditions) | RHS (Added Effects) |
    | -------------------- | ------------------- | 
    | change               | - (Remove)          |
    | turn player_d        | turn player_a       |

We manage to switch between the stages using `qui` construct. Learn more about [Quiescence](\Quiescence.html). The qui predicate is added to the state when the stage reaches quiescence, which is when no more rules in that stage can fire. Thus, when you have qui * stage playershift, you know that no more rules in the `playershift` stage can execute, so you replace those predicates with stage turn * interact, which lets you execute a rule from the turn stage.

Ceptre text based code:
```
stage turn { 
drive : interact * $turn P * at P C * $adjacent C C' -o  at P C'.
build : interact * $turn Player * $at Player City * hand Player Card * $city_card City Card -o research_center City.
fly : interact * $turn P * at P C * hand P CityCard * $city_card C' CityCard -o at P C'.
treat : interact * $turn Player * $at Player City * disease City -o ().
} 
#interactive turn.
 qui * stage turn -o stage playershift * change.
stage playershift = {
    papb : change * turn player_a -o turn player_b.
    pbpc : change * turn player_b -o turn player_c.
    pcpd : change * turn player_c -o turn player_d.
    pdpa : change * turn player_d -o turn player_a.
}
qui * stage playershift -o stage turn * interact.
```

## Initial State

The Initial State is the state of execution your program will begin in. We will define the initial game map with adjacent predicate by specifying which cities are adjacent to each other. Similarly, we will be putting all the players in their place, and initialize the game configuration with their turns and status of cards in their hands. 

<!---Ceptre Web editor simulation: 
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146066796-4d8a1549-d3cd-4f99-9b66-c06b220a8953.mov">
</video>-->




Ceptre text-base code:

```
context init = {
    adjacent atlanta los_angeles, 
    adjacent los_angeles atlanta,
    adjacent los_angeles bogota,
    adjacent bogota kinshasa,
    adjacent bogota los_angeles,
    adjacent kinshasa bogota,
    adjacent kinshasa delhi,
    adjacent delhi kinshasa,
    adjacent delhi los_angeles,
    adjacent los_angeles delhi,
    at player_a atlanta,
    at player_b atlanta,
    at player_c atlanta,
    at player_d atlanta,
    turn player_a,
    turn player_a,
    turn player_a,
    turn player_a,
    hand player_a bogota_card,
    hand player_a los_angeles_card
}.
#trace _ main init.
```
<!---Ceptre Web editor simulation: 
<video width = "650" controls>
    <source src = "https://user-images.githubusercontent.com/42487202/146068665-ba7ef62a-238d-4aa6-894e-4bb0b24817c9.mov">
</video>-->

## Execution
To run the text-based version of the program, run the executable with the name of your Ceptre file as an argument. For example:`./ceptre-bin Pandemic.cep`. The complete code for Pandemic is as follows:

```
cities : type.
atlanta : cities.
los_angeles : cities.
bogota : cities.
kinshasa : cities.
delhi : cities.
players : type.
player_a : players.
player_b : players.
player_c : players.
player_d : players.
card : type.
atlanta_card : card.
los_angeles_card : card.
bogota_card : card.
kinshasa_card : card.
delhi_card : card.
hand players card : pred.
at players cities : pred.
turn players : pred.
adjacent cities cities : pred.
city_card cities card: pred.
disease cities : pred.
research_center cities : pred.
interact : pred.
change : pred.
done : pred.
stage turn { 
drive : interact * $turn P * at P C * $adjacent C C' -o  at P C'.
build : interact * $turn Player * $at Player City * hand Player Card * $city_card City Card -o research_center City.
fly : interact * $turn P * at P C * hand P CityCard * $city_card C' CityCard -o at P C'.
treat : interact * $turn Player * $at Player City * disease City -o ().
} 
#interactive turn.
 qui * stage turn -o stage playershift * change.
stage playershift = {
    papb : change * turn player_a -o turn player_b.
    pbpc : change * turn player_b -o turn player_c.
    pcpd : change * turn player_c -o turn player_d.
    pdpa : change * turn player_d -o turn player_a.
}
qui * stage playershift -o stage turn * interact.
context init = { 
adjacent atlanta los_angeles, 
adjacent los_angeles atlanta, 
adjacent los_angeles bogota, 
adjacent bogota kinshasa, 
adjacent bogota los_angeles, 
adjacent kinshasa bogota, 
adjacent kinshasa delhi, 
adjacent delhi kinshasa, 
adjacent delhi los_angeles, 
adjacent los_angeles delhi, 
at player_a atlanta, 
at player_b atlanta, 
at player_c atlanta, 
at player_d atlanta, 
turn player_a, 
hand player_a bogota_card, 
hand player_b los_angeles_card, 
hand player_c kinshasa_card, 
hand player_d delhi_card, 
city_card atlanta atlanta_card, 
city_card los_angeles los_angeles_card, 
city_card bogota bogota_card, 
city_card kinshasa kinshasa_card, 
city_card delhi delhi_card,
interact}.
#trace _turn init.
```


<!--![ceptre-editor-pandemic-transitions](https://user-images.githubusercontent.com/42487202/146068993-039e5990-a88b-4fda-8b8a-2af4bd1d759d.png)

![ceptre-editor-pandemic-states](https://user-images.githubusercontent.com/42487202/146069003-46c8d4e5-be84-41e7-a19a-527651893522.png)-->


