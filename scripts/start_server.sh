#!/bin/bash
cd /var/www/html/files
npm install
ng build --prod 
cp -r dist/* /var/www/html/build
rm -rf /var/www/html/files/*

# restart nginx
service nginx restart
