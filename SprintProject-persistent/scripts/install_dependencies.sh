#!/bin/sh

#install node-modules
cd /home/ubuntu/sprintproject3/SprintProject-persistent
sudo npm install

#Init the server with pm2
pm2 start /home/ubuntu/sprintproject3/SprintProject-persistent/ecosystem.config.js --env production -watch
