#!/bin/sh
#create our working directory if it doesnt exist
DIR="/home/ubuntu/sprintproject3/SprintProject-persistent"

rm -rf ${DIR}

mkdir ${DIR}

cd ${DIR}

cp ../tmp/.env .env
