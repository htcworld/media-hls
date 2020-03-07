const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
var port = process.env.port || 3000;
app.listen(port, () => {
    console.log('listen 3000!')
});
const NodeMediaServer = require('node-media-server');

const config = require('./config')

const createPlaylist = require('./create-playlist')

var nms = new NodeMediaServer(config)

nms.on('prePublish', (id, StreamPath, args) => {
  if (StreamPath.indexOf('hls_') != -1) {
    const name = StreamPath.split('/').pop()
    createPlaylist(name)
  }
});

nms.run();

