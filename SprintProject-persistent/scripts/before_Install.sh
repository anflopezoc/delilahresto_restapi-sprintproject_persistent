#!/bin/bash

DIR="/home/ubuntu/sprintproject3/SprintProject-persistent"

if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi