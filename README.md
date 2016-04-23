# vk-auth-prompt

[![Build Status](https://travis-ci.org/ewnd9/vk-auth-prompt.svg?branch=master)](https://travis-ci.org/ewnd9/vk-auth-prompt)

CLI auth prompt for [vk.com api](https://vk.com/dev)

## Install

```
$ npm install --save vk-auth-prompt
```

## Usage

```js
const vkAuthPrompt = require('vk-auth-prompt');

vkAuthPrompt('<app-id>', '<scope>', getToken, setToken)
  .then(token => {
    console.log(token);
  });

function getToken() {
  // get from storage
}

function setToken() {
  // persist in storage
}
```

## License

MIT © [ewnd9](http://ewnd9.com)
