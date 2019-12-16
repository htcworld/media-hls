# NodeJS RTMP HLS Server
Based on node-media-server. A live streaming server that allow adaptive bitrate for HLS.

## Installation
```
docker-compse build
docker-compose up
```

## From OBS
Settings -> Stream
Stream Type : Custom Streaming Server
URL : rtmp://localhost:1935/live
Stream key : STREAM_NAME

## Accessing the live stream
```
HLS - http://localhost:8000/live/STREAM_NAME/index.m3u8
FLV - http://localhost:8000/live/STREAM_NAME.flv
WSS - ws://localhost:8000/live/STREAM_NAME.flv
RTMP - ws://localhost:8000/live/STREAM_NAME
```

## Cluster Mode
Ask me how
