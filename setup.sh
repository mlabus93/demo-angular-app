#!/bin/bash

echo "***** Installing node server... *****"
npm install
echo "***** FINISHED installing node server *****"
cd app
echo "***** Installing client modules... *****"
npm install
echo "***** FINISHED installing client modules *****"
echo "***** Installing bower components... *****"
bower install
echo "***** FINISHED installing bower components *****"
