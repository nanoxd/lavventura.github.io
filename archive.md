---
layout: page
title: Archiwum
permalink: /archiwum/
weight: 5
---

<section id="archive">

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tag_words = site_tags | split:',' | sort %}
  <ul class="tag-box inline">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
    <li><h3><a href="{{ site.baseurl }}/tag/{{ this_word }}/">#{{ this_word }}</a></h3></li>
  {% endunless %}{% endfor %}
  </ul>
  <hr/>
 
  <form method="get" id="search" action="http://duckduckgo.com/"> 
  	<input type="hidden" name="sites" value="YOURDOMAIN.COM"/>
  	<input type="hidden" name="k8" value="#444444"/>
  	<input type="hidden" name="k9" value="#D51920"/>
  	<input type="hidden" name="kt" value="h"/>
  	<input class="searchie" type="text" name="q" maxlength="255" placeholder="Szukaj&hellip;"/>
  	<button class="icon"><span class="icon-search"></span></button>
  	</form>
  	  
  <hr/>
  
  {% for post in site.posts %}
  {% include tag-generate.html %}
	{% capture month %}{{ post.date | date: '%m%Y' }}{% endcapture %}
	{% capture nmonth %}{{ post.next.date | date: '%m%Y' }}{% endcapture %}
		{% if month != nmonth %}
			{% if forloop.index != 1 %}
			</ul>
			{% endif %}
			<h2>{% include date_pl_short.html date = post.date %}</h2>
			<ul class="related-posts">
		{% endif %}
	 {% include post-list-item.html post=post format="%d/%m" %}
	  <span class="post-tag right">{{ tags_content }}</span>
	 {% endfor %}
	 </ul>
  
  
  </section>
