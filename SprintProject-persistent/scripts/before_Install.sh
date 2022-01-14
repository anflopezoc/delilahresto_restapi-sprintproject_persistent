#!/bin/bash

#create our working directory if it doesnt exist
DIR="/home/ubuntu/sprintproject3/SprintProject-persistent"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi