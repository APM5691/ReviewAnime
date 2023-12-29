#!/bin/bash
cd /var/www/html/files
npm install
ng build
cp -r dist/markdown/* /var/www/html/build
# rm -rf /var/www/html/files/*
# rm -rf /var/www/html/files/.*

# restart nginx
service nginx restart
