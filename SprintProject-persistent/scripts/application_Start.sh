#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ubuntu/sprintproject3/SprintProject-persistent

#install node modules
sudo npm install
echo "node modules installed"
#start our node app in the background

sudo pm2 start ecosystem.config.js --env production --watch
echo "run pm2"