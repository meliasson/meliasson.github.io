---
date: 2019-11-23
layout: post
splash: game-of-life-mod.jpg
tags: [tdd]
title: TDD Conway's Game of Life! Again!
---
Yes it has been done before. By many, if not all. Probably even by me. And still there is value in doing it again, for beginners as well as for experts. By brushing up on the basics, we get an opportunity to evaluate, and if needed strengthen, our fundamental skills. So let's TDD Conway's Game of Life, again, and see what we learn this time.

The Game of Life is a zero-player game, requiring no further input after receiving its initial configuration. The game consists of a two-dimensional infinite grid of cells, where each cell is alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step, the following transitions occur: 1) any live cell with fewer than two live neighbors dies, 2) any live cell with two or three live neighbors lives on, 3) any live cell with more than three live neighbors dies, and 4) any dead cell with exactly three live neighbors becomes a live cell.

To start, we have to do some high level design up front, since no tests can be written without us having a rough idea of how the interface of the subject under test will look like. With the Game of Life we are lucky, since it is easy to construct its interface as a [pure function](https://en.wikipedia.org/wiki/Pure_function){:target="blank"}. And we love pure functions, since they&mdash;with their lack of state and side effects&mdash;pretty much guarantee simple tests. So here, the high level design results in a subject under test that is a pure function, `stepGame`, taking the grid as input, and returning a new grid, in which the transitions above have been applied. Regarding the grid, it will be finite, but of no predefined size, so `stepGame` must be able to handle grids of varying sizes. And regarding grid boundaries, `stepGame` will handle non-existing cells as dead cells. And that is all the design we will do at this point; we refrain from going into any details, since we trust that they will emerge as needed during the TDD.

Let us pause here and reflect on how TDD already, without us having written a single test, is beneficial. Take the high level design that we are forced to do. A bit of thinking ahead, by for example sketching out a few diagrams on a whiteboard or with pen and paper, can be awarding and effective. You are, for example, probably not as easily distracted by details as you are when writing code, and to work with another medium can provide a fresh perspective. Or take our trust that TDD will drive most of the design, in a comfortable just-in-time manner, relieving us of difficult and error-prone tasks like predicting futures and doing [Big Design Up Front](https://en.wikipedia.org/wiki/Big_Design_Up_Front){:target="_blank"}.

We our now ready to write our first test, and we will start developing logic for the first transition, "any live cell with fewer than two live neighbors dies". Hence we create the test:

{% highlight javascript %}
test("live cell with zero live neighbors dies", () => {
  const grid = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(0);
});
{% endhighlight %}

When writing code to make this test pass, we will do some fairly heavy lifting that we will not have to repeat for subsequent tests. We will for example define `stepGame`, and implement some kind of grid traversing, neighbor counting, algorithm, that respects grid boundaries. When we are done, and the test passes, we need one more for the same transition. One that it most likely will take less effort to pass:

{% highlight javascript %}
test("live cell with one live neighbor dies", () => {
  const grid = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(0);
});
{% endhighlight %}

When we have written enough code to make this test pass, we are done with the logic for the first transition, and move on to the second transition, "any live cell with two or three live neighbors lives on", where we start with the following test:

{% highlight javascript %}
test("live cell with two live neighbors lives", () => {
  const grid = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(1);
});
{% endhighlight %}

And as for the first transition, we want one more test also for this one:

{% highlight javascript %}
test("live cell with three live neighbors lives", () => {
  const grid = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
  ];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(1);
});
{% endhighlight %}

As soon as this test passes, and we are happy with the code we have written, the second transition is complete. Time for transition three, "any live cell with more than three live neighbors dies":

{% highlight javascript %}
test("live cell with more than three live neighbors dies", () => {
  const grid = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(0);
});
{% endhighlight %}

This is the only test we deem as necessary for the third transition, so when we have made it pass, we take on the fourth and final transition with a final test:

{% highlight javascript %}
test("dead cell with three live neighbors becomes live cell", () => {
  const grid = [
    [1, 0, 1],
    [0, 0, 0],
    [0, 1, 0]];
  const result = stepGame(grid);
  expect(result[1][1]).toEqual(1);
});
{% endhighlight %}

And that's it. When this test passes, we have a working implementation of Conways Game of Life on our hands. If I where to pick one key benefit of TDD this time around, it would be the clear split between what and how. When writing tests, the sole focus is on the what. When writing code to make the test pass, we do not bother with the what at all. We just listen to our tests, and can put our focus on the how. Which we appreciate immensely, since writing clean, intent revealing, code is challenging enough without splitting focus between what and how.

A couple of details worth mentioning, before wrapping up: one is that the tests are written in [Jest](https://jestjs.io/){:target="_blank"}, and the other is that you can find the full implementation, including the tests above [here](https://github.com/meliasson/game-of-life){:target="_blank"}. And if you want to watch the game being played, you can do so [here](https://me-game-of-life.herokuapp.com/). It is a React app, where I use the MVC design pattern for separation of concerns, and a responsive HTML canvas element for drawing the grid.
