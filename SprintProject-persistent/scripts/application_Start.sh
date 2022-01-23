#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ubuntu/sprintproject3/SprintProject-persistent

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
sudo npm install
echo "node modules installed"
#start our node app in the background

pm2 start ecosystem.config.js --env production --watch
echo "run pm2"