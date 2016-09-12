````
                              ______ _____ _____ _____                               
                              | ___ \  _  |  __ \  _  |                              
                              | |_/ / | | | |  \/ | | | ___  ___ _ ____   _____ _ __ 
                              |  __/| | | | | __| | | |/ __|/ _ \ '__\ \ / / _ \ '__|
                              | |   \ \_/ / |_\ \ \_/ /\__ \  __/ |   \ V /  __/ |   
                              \_|    \___/ \____/\___/ |___/\___|_|    \_/ \___|_|   
````
<div align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Pokemon%20GO-0.35.0-blue.svg?style=flat-square" />
  </a>
  <a href="https://github.com/maierfelix/POGOserver/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/GNU GPL-License-blue.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
</div>

<img width="25%" src="http://i.imgur.com/7VhPleu.png" />
<img width="24%" src="http://i.imgur.com/E82eqtk.png" />
<img width="24%" src="http://i.imgur.com/H692S9d.png" />
<img width="25%" src="http://i.imgur.com/LGrdUeH.png" />

# Getting started

## Setup

Copy and rename ``cfg.js.example`` to ``cfg.js``.

Open ``cfg.js`` and fill the following fields:

````js
DOWNLOAD_PROVIDER: "GOOGLE";
DOWNLOAD_USERNAME: "USERNAME";
DOWNLOAD_PASSWORD: "PASSWORD";
````

## Tunneling setup
The pokemon go app traffic has to get forwarded manually to this custom server. Download [rastapasta](https://github.com/rastapasta)'s [Pokemon Go Xposed](https://github.com/rastapasta/pokemon-go-xposed/releases) app and follow the installation instructions [here](https://github.com/rastapasta/pokemon-go-xposed#how-to-use-it).

## Database setup

To setup a database connection, open ``cfg.js`` and change the database login credentials:

````js
MYSQL_PORT: 3306,
MYSQL_HOST_IP: "127.0.0.1",
MYSQL_DB_NAME: "pogosql",
MYSQL_USERNAME: "root",
MYSQL_PASSWORD: "",
````

The required database tables get generated automatically.

## Server setup

You need at minimum [Node.js](https://nodejs.org/en/) version 6.x.

Open up a terminal and enter ``npm run boot`` to start the server.

## Docker setup

1. Download ``Dockerfile``, ``cfg.js.example`` and ``supervisord.conf`` from github.
2. Place ``Dockerfile``, ``cfg.js.example`` and ``supervisord.conf`` into the same folder. Rename ``cfg.js.example`` to ``cfg.js``.
3. Modify ``cfg.js`` to your requirements as described above.
4. Create a container and run it.
5. Open a bash prompt, enter: ``cd /POGOserver/`` and ``./run-linux.sh``.
6. Connect the Pokemon Go app to the server.
7. Done.

Note: Instead of automatically mapping the ports, map them static, so they don't change after reboot.
