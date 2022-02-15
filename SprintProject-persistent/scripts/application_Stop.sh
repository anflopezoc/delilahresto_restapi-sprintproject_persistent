#!/bin/bash

#Stopping existing node servers
echo "Stopping any existing docker services"
sudo docker kill  nodeserver
sudo docker rmi -f nodeimage
