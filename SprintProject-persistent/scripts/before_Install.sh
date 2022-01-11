#!/bin/bash

DIR="/home/ubuntu/sprintproject3/SprintProject-persistent"

if [ -d "$DIR" ]; then
    echo "$DIR exists"
    rm -rf ${DIR}
#    rm -rf ${DIR}/{*,.*}
fi

mkdir ${DIR}

cd ${DIR}

cp ../tmp/.env .env