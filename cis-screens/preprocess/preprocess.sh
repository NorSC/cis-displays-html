#!/bin/sh
echo "Downloading $SCREENS_FILE"
wget -O ./preprocessed.json "$SCREENS_FILE"
# wget -O ./filenames.json $FILES_FILE
sleep 1
node ./preprocess.js