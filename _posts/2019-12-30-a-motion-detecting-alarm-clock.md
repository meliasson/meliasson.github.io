---
date: 2019-12-30
layout: post
tags: [raspberry pi, python]
title: A motion detecting alarm clock
splash: alarm-clock-mod.jpg
---
If you, like me, happen to have a Raspberry Pi lying around, together with a motion sensor and a speaker, why not put it to work by building a motion detecting, weather reporting, inspirational quote reading alarm clock?

I can’t come up with a single scenario where the return of investment on building your own alarm clock is anything but ridiculously high. If the clock actually works, you'll probably be so thrilled that you'll fly out of bed, and if it doesn't work, you'll simply get more sleep, right? And no matter if we get the clock working or not, we have&mdash;with a small project like this&mdash;a great opportunity to practice our fundamental programming skills.

The clock I envision has two user interfaces, one for the alarm itself, and one for setting the alarm. I will implement both in Python, partly because the language seems to be embraced by the Raspberry Pi community, and partly because I rarely get the opportunity to use the language.

We start with the alarm interface. It sounds its signal until movement is detected, then presents today’s weather, and finally tops off with a random, hopefully inspiring, quote. The signal is built with [pygame](https://www.pygame.org/){:target="_blank"}, and an mp3 file containing the actual sound. The code needed to get the signal playing is:

{% highlight python %}
import pygame
pygame.mixer.init()
pygame.mixer.music.load("signal.mp3")
pygame.mixer.music.play()
{% endhighlight %}

The motion detection is built with [GPIO](https://www.raspberrypi.org/documentation/usage/gpio/){:target="_blank"}, and the following code initializes the motion sensor:

{% highlight python %}
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN)
{% endhighlight %}

The weather and the quote is fetched from public APIs, in my case from Openweathermap and Theysaidso, with the help of the [requests](https://github.com/psf/requests){:target="_blank"} library:

{% highlight python %}
import requests
weather = requests.get('url to weather json api here').json()
{% endhighlight %}

We then use [Festival](http://festvox.org/festival/){:target="_blank"} via [subprocess](https://docs.python.org/3/library/subprocess.html){:target="_blank"} to make the Raspberry Pi read us a weather report and a quote:

{% highlight python %}
import subprocess
subprocess.call(f"echo \"{quote}\" | festival --tts", shell=True)
{% endhighlight %}

Finally, we wait until motion is detected or the signal has finished playing before the weather and the quote are read, with the following loop:

{% highlight python %}
while not motion_registered() and not signal_finished():
    pass
speak()
{% endhighlight %}

With that, we are done with the alarm itself, and move on to the interface for setting the alarm, which basically consists of a couple of [cron](https://en.wikipedia.org/wiki/Cron){:target="_blank"} commands, wrapped in a Python script. The script requires two arguments, which determine when the alarm starts, and an invocation of the script, if we want the alarm to start at 06:15, can look like:

{% highlight bash %}
> python setalarm.py 6 15
{% endhighlight %}

You can find the implementation of the script, together with all code for the alarm itself, [here](https://github.com/meliasson/raspberry-pi-alarm-clock){:target="_blank"}. And I'm the first one to admit that the alarm clock is a bit crude at this stage. However, it's more or less on purpose. From an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product){:target="_blank"} perspective, we're in a sweet spot here, where we can start gathering insights by testing the clock, rather than blindly adding new features or improving already existing ones. (We've possibly already experienced some scope creep, with for example the inspirational quote, right?)
