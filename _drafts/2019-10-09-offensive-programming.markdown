---
layout: post
title: Your code needs a dose of offensive programming
date: 2019-10-17
tags: [simplicity, robustness, offensive programming]
---
You want simple and robust code? Where bugs are rare, easy to track down, and fixing them is as straightforward as possible? Unfortunately you are, most likely&mdash;together with the majority&mdash;busy creating rather the opposite. But do not despair, the offensive programming principle is here to help!

{% include image.html url="/assets/laughing-cavalier.jpg" description="The expression on my face, when learning that others have shared my itch and invented the Offensive Programming principle for it, was probably close to the subject's smug face in the Laughing Cavalier by Frans Hals." %}

In short, offensive programming is about establishing a line of defense for your program and, inside that line, adopt a zero tolerance policy for errors. Fail fast, and let errors ring out as loudly as possible. Put no effort into tolerating and handling them. Because if you do, you: 1) hide errors and make it hard to understand where they stem from, 2) risk putting your program in weird states; think blank screens and things just freezing up on you, 3) increase the size and complexity of your code, 4) welcome errors by tolerating them, and 5) make it difficult to discern what the actual, correct behavior of the program is. If you instead resist the urge to tolerate and handle all errors, you will have code that focuses on nothing but the correct behavior. The two examples below tries to illustrate the positive impact of offensive programming.

Say that we have an application where users, as part of creating accounts, are required to input their social security numbers (SSNs). The code receiving the SSNs supplied by users is outside the application's line of defense. There, we do not demand correct behavior. We check for null, we make sure that the format of received SSNs is the one we want, we guard against malicious input, and so on. Inside the line of defense, on the other hand, we do the opposite: We assume, and may even assert, that our software's behavior is correct. If SSNs are required on accounts in our application, nowhere do we check for null:

{% highlight javascript linenos %}
// We just do:
functionThatCrashesIfSsnIsNull(account.ssn);

// Instead of tangling ourselves up in:
if (account.ssn) {
  functionThatCrashesIfSsnIsNull(account.ssn);
} else {
  tryToCompensateForMissingSsn(account);
}
{% endhighlight %}

If `account.ssn` is null in the code snippet above, we have a problem. But the problem stems from another part of our application&mdash;probably the part outside the line of defense, where we receive SSNs from our users&mdash;and should be fixed there, instead of tolerated here.

If we have decided that SSNs should be of a certain format in our application&mdash;which we hopefully have&mdash;nowhere do we accept that the format differs from the decided one:

{% highlight javascript linenos %}
// We just do:
functionThatNeedsCorrectSsnFormat(account.ssn);

// Instead of tangling ourselves up in:
let ssn = account.ssn;
if (isSsnFormatInvalid(account.ssn)) {
  ssn = tryToFormatSsn(account.ssn)
}
functionThatNeedsCorrectSsnFormat(ssn);
{% endhighlight %}

If the format of `account.ssn` in the code snippet above differs from the decided one, we have a problem. But just as in the previous example, the problem stems from another part of the application, and should be fixed there.

With the examples above in mind, it is easy to see that our pursuit of robust code easily takes us in the opposite direction, where convoluted solutions are created. We hide errors that should not exist. We increase code size and complexity. We tell other parts of our application that it is fine to violate contracts and produce errors. We blurry lines between right and wrong. And who knows what happens if we cannot compensate for a missing SSN, or fail formatting an SSN into the format we want?

So, to conclude, go ahead treat your code to a liberal dose of offensive programming! It will crank up your development speed, since you will have code that is easier to understand and reason about, where bugs are fewer and simpler. Which in the end will benefit your users more than a program with a severe limp, in the form of weird and unexpected errors, where further development takes longer than necessary.
