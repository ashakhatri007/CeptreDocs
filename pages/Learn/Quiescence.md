---
title: Quiescence
tags: [getting_started, troubleshooting]
keywords:
summary: "In this page we introduce to basic programming constructs for ceptre language - Quiescence"
sidebar: mydoc_sidebar
permalink: Quiescence.html
folder: Learn
---

## Definition

"Quiescence" is a stage in ceptre program where no more rules are able to fire, at which point control may be transferred to another stage.

## Syntax

We use `qui` construct which is a special token denoting quiescence of the program. All outer-level rules must have this form: upon quiescence, replace one stage resource with another.

The basic syntax for defining quiescence goes in below manner:
```
qui * stage S [* ...] -o stage S’ [* ...].
```

Where [* ...] is meta-syntax denoting any additional tensored-together resources. The rule denotes, “At quiescence, if stage S is active (and potentially some additional state), transition to stage S' (and potentially remove/add some additional state).”

## Example

Let's take an example where there are two stages i.e. act and react. The `act` stage comprises user selected rules whereas `react` stage comprises involuntary reactive rules. We can use `qui` construct to transition from stage act into stage react and vice versa.

```
stage act = {
    % User-selected rules.
}
qui * stage act -o stage react.
stage react = {
    % Involuntary, reactive rules.
}
qui * stage react -o stage act.
```

{% include note.html content="`%` denotes single line comment in ceptre" %}