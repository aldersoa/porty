---
title: "modHaus"
slug: "modhaus"
section: play
disciplines: "CAD · Embedded programming · Music"
source: "https://gailalderson.com/modhaus"
locked: false
cover: "/media/modhaus/01.png"
---
idea
ModHaus is short for "modular housing", which is a not-so-hilarious-as-I-once-thought nod to the formulaic genre it helps produce. ModHaus is my attempt at developing a highly intuitive instrument for exploring tech house production. This genre lends itself well to experimentation by amateur musicians, as most songs contain one or many of these core instruments at any given point in a song:

1.  Percussion (basic): kicks, snares, hi hats, claps
2.  Percussion (special): tambourines, guiros, toms, shakers
3.  Synths: basslines, melodies
4.  FX: crackles, atmosphere fills, buildups, vocals

MVP specs
1.  Turn sample on when something is touched
2.  Turn sample off when something is released
3.  Provide visual feedback after touch/release
4.  Provide auditory feedback after touch/release

supplies
•  soldering iron
•  solder
•  flush cutters
•  solid core wire
•  wire strippers
•  button pad 4x4 ( link )
•  button pad PCB ( link )
•  Arduino Mega or Uno
•  (x4) phillips head screws (1/2", 4-40)
•  (x4) nylon standoffs (3/8", 4-40)
•  (x16) LED - RGB clear (common cathode)
•  (x16) small signal diodes (1N4148)

process
Prepared PCB    →    soldered diodes, soldered LEDs, wired buttons, and wired LEDS.

soldering diodes

finished diodes

soldering LEDs

clipping LEDs

Tested everything    →   I used a simple Arduino program that walks around all 16 LEDs in the button matrix, ensuring that each one a) turns on and b) is able to change between red, green, and blue.

Designed housing    →    The MVP version of this project is much less exciting than a full blown version. Ideally, I would've loved to have mapped sensors and lights to playground equipment of some kind– something that adults could climb and hang on to control what samples were played. That said, we're stuck with the boring version here, so I created this STL in Fusion360.

printing housing

securing components

Tested everything    →    Similar to my testing in a previous step, I used a simple Arduino program to ensure that my button matrix was working appropriately by turning on a light anytime a button was pressed.
Programmed microcontroller    →    After much trial and error, I ended up with a program that reads input from the button matrix and 1) sends a serial message to Arduino containing information regarding what sample to play and 2) turns on/off the light on top of that button.

Created plugin for Ableton    →    This was by far the most challenging part of this project. I started with a bare bones Arduino plugin that read in serial input to control the volume of one track. Then, I extrapolated the template to form a full fledged plugin capable of reading in more complex serial input.

challenges
Sacrificing your vision for functionality: I took the "spiral development" approach, which is great– but I applied it in the wrong way. Instead of focusing on getting 50% of my vision and 50% of my functionality built, I built 0% of my vision and 100% of my functionality. That said, I'm glad I have the programmatic building blocks necessary to develop the fun version of the interface moving forward.

Troubleshooting PureData/Ableton M4L: both of these platforms have a hefty following of artists and engineers alike, yet, I found myself scraping the bottom of the barrel when it came to finding relevant online documentation and resources.

Adjusting quantization: I wanted to add enough of a framework that people were able to explore new rhythms and syncopations, but not enough to create a cacophony of slightly delayed percussion and synths. I started with 1/32 quantization, but then ended up at 1/8 after a ton of trial and error. There's a bit of latency that occurs in the communication between my microcontroller and Ableton, so I had to adhere to more strict quantization to make sure things aligned more easily.

conclusion
I ended up learning almost everything I set out to learn in this project, which I feel really proud of. I've also really enjoyed watching people interact with it for the first time. The UX researcher in me wants to pick apart and understand every hesitation, fumbled button stroke, and furrowed brow… but the music lover in me just wants to hear what they'll create. Because who doesn't love four on the floor?
