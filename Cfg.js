import fs from "fs";

export default {

  VERSION: JSON.parse(fs.readFileSync("./package.json")).version,

  // show greeting
  GREET: true,

  // Api things
  API_ENABLE: true,
  API_USERNAME: "root",
  API_PASSWORD: "",
  API_ALLOWED_HOSTS: ["localhost", "127.0.0.1"],

  // Server settings
  MAX_CONNECTIONS: 64,
  PORT: 3000,
  // If using vmware, vps or multiple network adapters, set the related ip here
  // otherwise leave it blank
  LOCAL_IP: "",
  GAME_MODE: 0,
  SAVE_INTERVAL: 1e4,
  // Better dont touch these
  TICK_INTERVAL: 1,
  // Timeouts
  BOOT_TIMEOUT: 1e4,
  PLAYER_CONNECTION_TIMEOUT: 1e3 * 60 * 30,
  CELL_TIMEOUT: 1e3 * 60,
  MINIMUM_CLIENT_VERSION: "0.35.0",
  DEFAULT_CONSOLE_COLOR: 32,
  TRANSFER_ACCOUNTS: false,

  // Server debug options
  DEBUG_DUMP_PATH: "logs/",
  DEBUG_DUMP_TRAFFIC: true,
  DEBUG_LOG_REQUESTS: true,

  // Choose a database type
  DATABASE_TYPE: "MYSQL",

  // MySQL credentials
  MYSQL_PORT: 3306,
  MYSQL_HOST_IP: "127.0.0.1",
  MYSQL_DB_NAME: "pogosql",
  MYSQL_USERNAME: "root",
  MYSQL_PASSWORD: "ronaldocr7",
  MYSQL_GYM_TABLE: "gym",
  MYSQL_USERS_TABLE: "users",
  MYSQL_SPAWN_TABLE: "spawn_points",
  MYSQL_POKESTOP_TABLE: "pokestop",
  MYSQL_OWNED_PKMN_TABLE: "owned_pkmn",

  // Used for asset download session
  DOWNLOAD_PROVIDER: "GOOGLE",
  DOWNLOAD_USERNAME: "Jeff22222323",
  DOWNLOAD_PASSWORD: "Ronaldocr7",

  // Google maps api key
  GMAPS_KEY: "AIzaSyDF9rkP8lhcddBtvH9gVFzjnNo13WtmJIM",

  // Currently supported pokemon
  MAX_POKEMON_NATIONAL_ID:145,
  DUMP_ASSET_PATH: "data/"

}

Skip to content
This repository
Pull requests
Issues
Gist
 @jeff65
 Watch 83
  Star 404
  Fork 195 maierfelix/POGOserver
 Code  Issues 59  Pull requests 4  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathPOGOserver/Dockerfile
016d793  on 17 Sep
@DracoMilesX DracoMilesX Removed run-linux in docker.
1 contributor
RawBlameHistory    
44 lines (43 sloc)  1.21 KB
FROM ubuntu:latest
MAINTAINER Draco Miles X
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -qq mysql-server mysql-client -y && apt-get upgrade -y && apt-get dist-upgrade -y 
RUN apt-get install -y \
					apt-utils \
					nano \
					build-essential \
					curl \
					lsb-release \
					openssl \
					libssl-dev \
					openssh-server \
					openssh-client \
					sudo \
					python \
					python-dev \
					python-pip \
					python3 \
					python3-dev \
					python3-pip \
					pkg-config \
					autoconf \
					automake \
					libtool \
					curl \
					make \
					g++ \
					unzip \
					supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y \
			nodejs \
			git
RUN git clone --recursive https://github.com/google/protobuf.git
RUN cd /protobuf && ./autogen.sh && ./configure && make && make check && make install && ldconfig
RUN cd /
RUN git clone --recursive https://github.com/maierfelix/POGOserver.git
COPY cfg.js /POGOserver/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN service mysql start && mysql -u root -e "create database pogosql";
EXPOSE 22 80 443 3306 3000
CMD ["/usr/bin/supervisord"]

[supervisord]
nodaemon=true

[program:sshd]
command=/usr/sbin/sshd -D
autorestart=true

[program:mysql]
command=/usr/bin/pidproxy /var/run/mysqld/mysqld.pid /usr/sbin/mysqld
autorestart=true
