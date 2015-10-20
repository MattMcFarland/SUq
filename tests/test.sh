#!/usr/bin/env bash

url=$1
filename=$1
re='(.*)[/\/]+(.*)'

while [[ $filename =~ $re ]]; do
  filename=${BASH_REMATCH[1]}${BASH_REMATCH[2]}
done

node bin/suq.js $url > tests/sites/$filename.json