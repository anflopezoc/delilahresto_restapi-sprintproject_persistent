#!/bin/bash
sudo apt-get install apache2

sudo npm install

pm2 start /home/ubuntu/sprintproject3/SprintProject-persistent/ecosystem.config.js --env production -watch
