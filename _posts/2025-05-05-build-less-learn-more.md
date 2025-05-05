---
date: 2025-05-05
layout: post
title: Build less, learn more
exclude_from_startpage: false
---

In software development, you often encounter the two behaviors "better safe than sorry" and "while we're at it, we might as well add...". At first glance, both seem wise, and responsible, and even mature. But these behaviors can easily lead us into overdesign, unnecessary complexity, and attempts to predict the future. Something humans are notoriously bad at. As the old Danish saying goes:

> It is difficult to make predictions, especially about the future.

And yet we try. We build in extensibility we may never need. We create abstractions with no real purpose&mdash;yet. We do things "just in case". We try to future-proof our systems. The problem is, we're guessing. And guesses are a poor foundation for good design.

That’s where YAGNI (You Aren’t Gonna Need It) comes in. Coined in the early 2000s in the Extreme Programming community, YAGNI is an antidote to overbuilding. The practice is simple: don't build something until you actually need it. Not because you're lazy, but because unnecessary features introduce something truly dangerous: complexity.

Fred Brooks wrote about this as early as 1986 in his classic essay No Silver Bullet. He distinguished between essential complexity and accidental complexity. Essential complexity is inherent in the problem you’re solving. Accidental complexity arises from the way we choose to solve the problem: our tools, architecture, frameworks, and assumptions. 

Accidental complexity creeps in when we build for futures that may never arrive. The result? Systems that are too complex for what they actually do. That slows us down. It makes learning harder. It discourages change. All for features no one may ever use.

There’s also an element of resource conservation here. Our time and attention are limited. Every feature we add, every abstraction we introduce, consumes part of our limited capacity. When we build more than necessary, we spend time on things that might never deliver value. Time that could have gone toward solving real, current problems. Overshooting wastes effort. Building just enough isn't just good design, it’s how we respect our team’s time and energy.

Enter the concept of Minimum Effective Dose (MED). Borrowed from medicine, it refers to the smallest dose required to produce the desired effect. Anything more just brings side effects. In software, it means building only what’s needed to solve the current problem, or to learn something useful. Right now.

This isn't about cutting corners. It's lean thinking in action: Build just enough to take the next step. Then learn. Iterate. Adjust. Because learning thrives in iteration. When we build too little, it quickly becomes obvious. But when we build too much, it’s far harder to tell what was unnecessary. So next time you or your team think "let’s build it now, it might come in handy later", pause for a moment and ask:

* Do we really need this today?
* What’s the cost in complexity if we build it now?
* What might we fail to learn if we build too much too soon?

When we do less, we often have the chance to do it better. We can give it more care. Make it simpler. Test it more thoroughly. Maintain it more easily. The small thing we do build has a greater chance of being solid, and is easier to throw away if it turns out to be wrong. This is how we build systems that are both resilient and adaptable. This is how we build for change, not for imagined futures. As Antoine de Saint-Exupéry put it:

> Perfection is attained not when there is nothing more to add, but when there is nothing more to take away.