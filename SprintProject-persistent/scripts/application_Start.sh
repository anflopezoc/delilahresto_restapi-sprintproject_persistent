#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ubuntu/sprintproject3/SprintProject-persistent

#start our node app in the background

pm2 start ecosystem.config.js --env production --watch
echo "run pm2"