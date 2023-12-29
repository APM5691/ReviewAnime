#!/bin/bash

# Configure nginx to serve the angular app on port 80 
# compile the angular app

cd /var/www/html/files
npm install
ng build --prod 
cp -r dist/* /var/www/html/build

# restart nginx
service nginx restart
