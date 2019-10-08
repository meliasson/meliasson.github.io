---
layout: post
title: Collections, we stopped returning null, right?
date: 2019-10-03
tags: [simplicity, robustness, offensive programming]
---
I am thinking about interfaces targeting collections here. Like a JSON API endpoint returning a collection of blog posts. Or the property of a blog post object, containing the tags of the blog post. We never return null&mdash;or anything else but collections&mdash;from interfaces like these, right?

{% include image.html url="/assets/the-scream.jpg" description="If you ask me, it is extremely likely that Edvard Munch painted The Scream after a programming session, during which he got null from an interface targeting a collection." %}

The topic has been discussed for a long time, in various places, at length. Examples being [Stack Overflow](https://stackoverflow.com/questions/1969993/is-it-better-to-return-null-or-empty-collection){:target="_blank"}, notable blogs like [ Eric Lippert's](https://blogs.msdn.microsoft.com/ericlippert/2009/05/14/null-is-not-empty/){:target="_blank"}, and influential books like [Clean Code](https://www.amazon.com/dp/0132350882/){:target="_blank"} by Robert C. Martin. And it seems like the absolute majority, if not everyone, agree that we are better off without null. Return collections and only collections, populated or empty, period. Sure, sometimes we disagree. But every time we do, it appears as if we are focusing on rather narrow special cases. And we all know that special cases are not special enough to break the rules.

So why do I still, in code that calls interfaces targeting collections, see so many null checks? Are our interfaces still returning null? Knowing that the code calling them will have to sacrifice simplicity, when forced to add null checks? Knowing that bugs will appear, since null checks will be forgotten?

Or are the interfaces actually well behaving, never returning null? And we still, in some kind of misguided strive for robustness, litter code that calls them with null checks? Because we have not taken the time to understand what the interfaces return, or does not return? Because we are attempting to future-proof the calling code, because who knows how the interfaces will change with time? Hopefully you see that none of these rationales make sense. Both of them lead to code that lies about the interfaces used, with the addition of not needed null checks. One by being lazy, the other by trying to predict the future.

So, to answer the question posed in the title of this blog post: Have we stopped returning null from interfaces targeting collections? Unfortunately no. At least if we are to trust the code calling them, since null checks remain. Fortunately the fix, no matter where we place our trust, is one and the same. And it is straightforward, but requires us to adopt a fail-fast mindset. The fix goes something like: 1) remove all null checks, 2) note where null reference errors occur, and 3) update interfaces involved in errors to not return null. And that is all. Now go and crash your programs with the help of null reference errors, on the quest for simple and robust software!
