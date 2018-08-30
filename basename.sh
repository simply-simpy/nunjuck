#!/usr/bin/env bash

# filename: basename.sh
yourfilenames=`ls ./src/templates/*.html`
for eachfile in $yourfilenames
do
   echo $eachfile
done