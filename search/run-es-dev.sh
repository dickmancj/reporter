#!/usr/bin/env bash
#echo "The script you are running has basename `basename $0`, dirname `dirname $0`"
#echo "The present working directory is `pwd`"
scriptdir=`dirname "$BASH_SOURCE"`
cd $scriptdir

docker run -d -v "$PWD/esdata":/usr/share/elasticsearch/data -v "$PWD/config":/usr/share/elasticsearch/config -p 9200:9200 -p 9300:9300 dickmancj/elasticsearch