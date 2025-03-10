---
date: 2025-03-06
layout: post
title: Is your production environment made of glass?
exclude_from_startpage: false
---

It seems like two fundamentally different styles exist when it comes to the handling of production environments. One treats it as a delicate artifact that must be protected at all costs; the other as something sturdy, designed to take a beating and keep going. Let’s call the first one the glass style and the second the tank style.

When the glass style is used, change is considered dangerous. Processes are rigid. Delays are long. Quality gates are many. Trust is low, a select few are allowed to “touch the fragile glass”. And here we find reliance on staging environments; supposed to mirror production, but never quite succeeding.

When the tank style is used, pretty much the opposite takes place. Change is embraced. Processes are lightweight, owned by the people working in them. Delays are avoided. Trust is high, everyone in the team is allowed to “drive the tank”. And instead of relying on staging environments, testing is done in production with concepts like feature flags, canary releases and chaos engineering.

So why is the glass style still a thing? Maybe it’s just inertia; organizations do what they’ve always done, even if it no longer makes sense. Maybe it’s fear; fear of change, fear of failure, fear of trusting people. Maybe it’s a flawed understanding of quality; seeing it as something that can be "slapped on" rather than being built-in from the start.

But in today’s world, where adaptability beats rigidity, where trust outperforms control, and where resilience matters, is there really any place for the glass style? Perhaps the real question is: if you find yourself in an organization still clinging to it, what can you do to move towards the tank style?
