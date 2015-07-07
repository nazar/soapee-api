# !/usr/bin/env bash

# install dependencies
sudo apt-get update
sudo apt-get install -y git-core curl build-essential

# install node via apt-get to match server versions for this debian distro

echo 'deb http://http.debian.net/debian wheezy-backports main' | sudo tee --append /etc/apt/sources.list
sudo apt-get update

#https://github.com/joyent/node/wiki/Backports.debian.org
sudo apt-get install -y nodejs-legacy
curl -L --insecure https://www.npmjs.org/install.sh | sudo bash


# install global npm packages

sudo npm install -g gulp@3.9.0