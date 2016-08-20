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
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
  <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
</a>

# Getting started

## Setup

Copy and rename ``cfg.js.example`` to ``cfg.js``.

Open ``cfg.js`` and fill the following fields:

````js
export const SERVER_POGO_CLIENT_PROVIDER = "GOOGLE";
export const SERVER_POGO_CLIENT_USERNAME = "USERNAME";
export const SERVER_POGO_CLIENT_PASSWORD = "PASSWORD";
````

## Tunneling setup
For now, the pokemon go app traffic has to get forwarded manually to this custom server. To do so, download [rastapasta](https://github.com/rastapasta)'s [Pokemon Go Xposed](https://github.com/rastapasta/pokemon-go-xposed/releases) app and follow the installation instructions [here](https://github.com/rastapasta/pokemon-go-xposed#how-to-use-it).

## Database setup

You can choose between using MySQL or MongoDB.

To setup a database connection, open ``cfg.js`` and set the database type (MySQL in this case):

````js
export const SERVER_USE_DATABASE = "MYSQL";
````

Make sure to enter your database login credentials as well.

````js
export const SERVER_MYSQL_PORT = 3306;
export const SERVER_MYSQL_HOST_IP = "127.0.0.1";
export const SERVER_MYSQL_DB_NAME = "pogosql";
export const SERVER_MYSQL_USERNAME = "root";
export const SERVER_MYSQL_PASSWORD = "";
export const SERVER_MYSQL_TABLE = "users";
````

## Server setup

You need at minimum [Node.js](https://nodejs.org/en/) version 6.x and npm version 3.x.
Depending on your OS, you need to run either ``run-linux.sh`` or ``run-windows.bat`` from the root folder.

If everything went fine, it should look like:

![Preview](http://image.prntscr.com/image/6ce92058147b4067b8027c42258a198c.png "")
