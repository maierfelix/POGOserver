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
					unzip
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y \
			nodejs \
			git
RUN git clone --recursive https://github.com/google/protobuf.git
RUN cd /protobuf && ./autogen.sh && ./configure && make && make check && make install && ldconfig
RUN cd /
RUN git clone --recursive https://github.com/maierfelix/POGOserver.git
RUN chmod +x /POGOserver/run-linux.sh
COPY cfg.js /POGOserver/
RUN service mysql start && mysql -u root -e "create database pogosql";
EXPOSE 22
EXPOSE 80
EXPOSE 443
EXPOSE 3306
EXPOSE 3000
CMD ["/usr/bin/mysqld_safe"]
CMD ["/POGOserver/run-linux.sh"]
