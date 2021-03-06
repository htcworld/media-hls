const NodeMediaServer = require('node-media-server');
const path = require('path')
const Ffmpeg = require('@ffmpeg-installer/ffmpeg');

const config = {
      rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: path.resolve(__dirname, './media'),
  },
  relay: {
    ffmpeg: Ffmpeg.path,
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_1080p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_720p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_480p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_360p',
      },
    ]
  },
  trans: {
    ffmpeg: Ffmpeg.path,
    tasks: [
      {
        app: 'hls_1080p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '192k', '-ar', 48000],
        vcParams: ['-vf', "'scale=1920:-1'", '-b:v', '5000k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '7500k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_720p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '128k', '-ar', 48000],
        vcParams: ['-vf', "'scale=1280:-1'", '-b:v', '2800k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '4200k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_480p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '128k', '-ar', 48000],
        vcParams: ['-vf', "'scale=854:-1'", '-b:v', '1400k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '2100k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_360p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '96k', '-ar', 48000],
        vcParams: ['-vf', "'scale=480:-1'", '-b:v', '800k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '1200k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      }
    ]
  }
};

var nms = new NodeMediaServer(config)

nms.run();