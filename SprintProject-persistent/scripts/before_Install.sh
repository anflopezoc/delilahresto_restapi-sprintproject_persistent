#!/bin/bash

DIR="/home/ubuntu/sprintproject3/SprintProject-persistent"

if [ -d "$DIR" ]; then
    echo "$DIR exists"
    sudo rm -rf ${DIR}
fi

mkdir ${DIR}

cd ${DIR}

cp /home/ubuntu/temp/.env .env