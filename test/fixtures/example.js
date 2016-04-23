#!/usr/bin/env node

'use strict';

global.Promise = require('pinkie-promise');

var vkAuth = require('../../dist/index');
var Configstore = require('configstore');
var pkg = require('../../package.json');
var config = new Configstore(pkg.name + '-test-example');

var vkTokenKey = 'vkToken';

vkAuth('1', 'audio,offline', config.get.bind(config, vkTokenKey), config.set.bind(config, vkTokenKey))
  .then(function(token) {
    console.log(token);
  })
  .catch(function(err) {
    console.log(err.stack || err)
  });
