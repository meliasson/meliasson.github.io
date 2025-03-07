---
date: 2025-03-06
layout: post
title: Is your production environment made of glass or is it a tank?
---

It seems like two fundamentally different styles exist when it comes to handling production environments. Let's call them the glass style and the tank style.

People embracing the glass style treats production as a delicate artifact that must be protected at all costs. Change is dangerous. Processes are rigid. Delays are long. Quality gates are many. Trust is low, a select few are allowed to "touch the vase". Observability is limited. And here we find the reliance on staging environments; supposed to mirror production, but never quite succeeding.

People embracing the tank style treats production as the opposite; something sturdy that is designed to take a hit and keep going. Change is embraced. Processes are lightweight and owned by the people working in them. Delays are frowned upon. Trust is high, everyone in the team is allowed to "drive the tank". And instead of relying on replicas, testing is done in production with concepts like feature flags, canary releases and chaos engineering.

(To me the tank style is superior. From a cultural as well as from a technical perspective. Where the glass style emphasizes processes, the tank style focuses on human beings. Is the glass style even a red flag? Does it even work these days? Distributed systems, cloud and so on. How does one transition from the glass style to the tank style. Say something about blame vs psychological safety. Say something about feelings and behaviors when )
