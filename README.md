````
______ _____ _____ _____                               
| ___ \  _  |  __ \  _  |                              
| |_/ / | | | |  \/ | | | ___  ___ _ ____   _____ _ __ 
|  __/| | | | | __| | | |/ __|/ _ \ '__\ \ / / _ \ '__|
| |   \ \_/ / |_\ \ \_/ /\__ \  __/ |   \ V /  __/ |   
\_|    \___/ \____/\___/ |___/\___|_|    \_/ \___|_|   
````

<a href="#">
  <img src="https://img.shields.io/badge/Pokemon%20GO-0.33.0-blue.svg?style=flat-square" />
</a>
<a href="https://discord.gg/gu8ZUJp">
  <img src="https://img.shields.io/badge/Discord-Join%20Chat%20%E2%86%92-738bd7.svg?style=flat-square" />
</a>

# Getting started

## Tunneling setup
For now, the pokemon go app traffic has to get forwarded manually to this custom server. To do so, download [this](https://github.com/rastapasta/pokemon-go-xposed/releases) app and follow the installation instructions [here](https://github.com/rastapasta/pokemon-go-xposed#how-to-use-it).

## Server setup

You need a running mongodb service, enter your credentials into ``./cfg.js``.

If everything went fine, it should look like:

![Preview](http://image.prntscr.com/image/6ce92058147b4067b8027c42258a198c.png "")

## Todo
  - Viewing a pokemon shows invalid data (wrong weight, height, type etc.)
  - Transfer button doesnt trigger (maybe related to above?)
  - Items doesnt show
  - Pokemon models get downloaded correctly, but somehow they dont load properly. They show on map, but not in pokemon info screen, pokedex or while encountering.
  - Players exp bar is bugged, proto related?