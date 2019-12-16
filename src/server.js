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