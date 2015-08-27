# !/usr/bin/env bash

# install dependencies
sudo apt-get update
sudo apt-get install -y git-core wget ca-certificates curl build-essential

# add additional sources

#node
echo 'deb http://http.debian.net/debian wheezy-backports main' | sudo tee --append /etc/apt/sources.list
#pg 9.4
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee --append /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update

# install node via apt-get to match server versions for this debian distro
# https://github.com/joyent/node/wiki/Backports.debian.org

sudo apt-get install -y --force-yes nodejs-legacy
curl -L --insecure https://www.npmjs.org/install.sh | sudo bash

# install global npm packages

sudo npm install -g gulp@3.9.0
sudo npm install -g knex@0.8.6
sudo npm install -g shipit-cli@1.3.0
sudo npm install -g maildev@0.12.0


# install Postgres 9.4

sudo apt-get install -y postgresql-9.4

# create vagrant user and DB for development env
sudo -u postgres bash -c "psql -c \"CREATE USER vagrant WITH PASSWORD 'vagrant';\""
sudo -u postgres bash -c "psql -c \"CREATE DATABASE soapee OWNER vagrant;\""

# install GraphicsMagic

sudo apt-get install graphicsmagick