#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ubuntu/sprintproject3/SprintProject-persistent

#install node modules
sudo npm install

#start our node app in the background
pm2 restart api