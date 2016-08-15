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
You need to intercept the traffic between the app and original server and forward it to this custom server implementation.
I'm using [Fiddler](http://www.telerik.com/fiddler) for this purpose. After installing Fiddler, go to ``Rules->Customize Rules`` and search for the function ``OnBeforeRequest``.
Append the following code into the functions body:
````swift
if (oSession.HostnameIs("pgorelease.nianticlabs.com")) {
  if (oSession.HTTPMethodIs("CONNECT")) {
    oSession["x-replywithtunnel"] = "127.0.0.1:3000";
    return;
  }
  oSession.fullUrl = "http://127.0.0.1:3000" + oSession.PathAndQuery;
}
````
Now go to `Tools->Telerik Fiddler Options->HTTPS` and enable ``Decrypt HTTPS traffic``.
I'm using [Nox App Player](http://en.bignox.com/pokemongo/) for android emulation, so open ``Settings->Wi-Fi->WiredSSID->Modify network`` and setup a proxy with the following settings:
````swift
Hostname: 192.168.178.x // your local ip4
Port: 8888 // fiddler default port
````

By ``0.31.0`` [certificate pinning](https://eaton-works.com/2016/07/31/reverse-engineering-and-removing-pokemon-gos-certificate-pinning/) was added. To bypass it, you need to install [this great app](https://github.com/rastapasta/pokemon-go-xposed). Just follow the readme guide to install it.

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