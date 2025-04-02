#!/bin/sh
# SCREENS_FILE="https://livenorthumbriaac-my.sharepoint.com/:u:/g/personal/tom_bartindale_northumbria_ac_uk/EdEqBv1wXy5MpfL8UyO7HfQBzoL8IogG6ujgfdBBr_ygmA?download=1"
wget -O ./preprocessed.json "$SCREENS_FILE"
# wget -O ./filenames.json $FILES_FILE
sleep 1
node ./preprocess.js