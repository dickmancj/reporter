/******************************************************************************
 UNCLASSIFIED
 © 2016 Applied Information Sciences
 See COPYRIGHT.txt for licensing information
 ******************************************************************************/

'use strict';

var Hapi = require('hapi'),
  server = new Hapi.Server();

const Path = require('path');
const DownloadService = require('./../src/services/downloadService')();

server.connection({
  host: '0.0.0.0',
  port: 8080,
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language']
    },
    files: {
      relativeTo: Path.join(__dirname, '../client/build')
    }
  },
  labels: ['api']
});

server.register([
  require('inert')
], function (err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/file/{id*}',
    handler: function (request, response) {
      DownloadService.downloadFile(request.params.id, response);
    }
  });

  server.route({
    method: 'POST',
    path: '/bulk/',
    handler: function (request, response) {
      response('hello world');
    }
  });

  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Server running at: ' + server.info.uri);
  });
});
