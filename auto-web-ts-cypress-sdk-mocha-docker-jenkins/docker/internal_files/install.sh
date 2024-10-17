#!/bin/bash -ex

apt-get update -y
apt-get upgrade -y

cd /tmp/

apt-get update -y
apt-get install Python3 -y

apt-get update -y

cd /app

# pip install requirements
python -m pip install -r requirements.txt

npm install