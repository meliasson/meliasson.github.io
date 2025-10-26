---
layout: default
title: Ramblings
permalink: /ramblings/
---

<div class="postspage">
  <ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.content | strip_html | truncate: 200 }}</p>
      </a>
    </li>
  {% endfor %}
  </ul>
</div>
