#!/bin/bash
cd /var/www/html/files
sudo yarn install
sudo yarn run build
sudo cp -r dist/markdown/* /var/www/html/build
sudo rm -rf /var/www/html/files/*
sudo rm -rf /var/www/html/files/.*

# restart nginx
sudo service nginx restart
