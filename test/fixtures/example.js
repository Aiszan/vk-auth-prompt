#!/usr/bin/env node

'use strict';

const vkAuth = require('../../dist/index');

const Configstore = require('configstore');
const pkg = require('../../package.json');
const config = new Configstore(`${pkg.name}-test-example`);

const vkTokenKey = 'vkToken';
console.log(`${pkg.name}-test-example`);

vkAuth('1', 'audio,offline', config.get.bind(config, vkTokenKey), config.set.bind(config, vkTokenKey))
  .then(token => {
    console.log(token);
  })
  .catch(err => console.log(err.stack || err));
