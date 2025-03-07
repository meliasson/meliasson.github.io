---
layout: default
title: Ramblings
permalink: /ramblings/
---

<div class="postspage">
  <h1>Ramblings</h1>
  <ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">
      <time>{{ post.date | date: "%b %d, %Y" }}</time>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content | strip_html | truncate: 150 }}</p>
      </a>
    </li>
  {% endfor %}
  </ul>
</div>
