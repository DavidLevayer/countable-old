FROM ubuntu:14.04

# Update first
RUN apt-get update -y && apt-get dist-upgrade -y

# Create default user
RUN useradd -m -s /bin/bash nodejs
RUN chown -R nodejs:nodejs /home/nodejs

#Install package necessary
RUN apt-get install -y build-essential git curl zip unzip && apt-get clean

#Install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs && npm install npm -g

RUN mkdir -p /var/countable/
VOLUME /var/countable/
WORKDIR /var/countable/

EXPOSE 3000

CMD su nodejs && npm install && npm start