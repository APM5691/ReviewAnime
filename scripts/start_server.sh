#!/bin/bash

# Configure nginx to serve the angular app on port 80 
# compile the angular app

cd /var/www/html/deploy
sudo ng build --prod --base-href /deploy/
sudo cp -r /var/www/html/deploy/dist/deploy/* /var/www/html/
sudo rm -rf /var/www/html/deploy
sudo systemctl restart nginx