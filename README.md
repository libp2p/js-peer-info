peer-info JavaScript implementation
================================

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io) [[![](https://img.shields.io/badge/freejs-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs) ![Build Status](https://travis-ci.org/diasdavid/js-peer-info.svg?style=flat-square)](https://travis-ci.org/diasdavid/js-peer-info) ![](https://img.shields.io/badge/coverage-%3F-yellow.svg?style=flat-square) [![Dependency Status](https://david-dm.org/diasdavid/js-peer-info.svg?style=flat-square)](https://david-dm.org/diasdavid/js-peer-info) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> IPFS Peer abstraction JavaScript implementation

# Description

# Usage

### In Node.js through npm

```bash
$ npm install --save peer-info
```

```javascript
var PeerInfo = require('peer-info')
```

### In the Browser through browserify

Same as in Node.js, you just have to [browserify](https://github.com/substack/node-browserify) the code before serving it. See the browserify repo for how to do that.

### In the Browser through `<script>` tag

Make the [peer-info.min.js](/dist/peer-info.min.js) available through your server and load it using a normal `<script>` tag, this will export the `peerId` constructor on the `window` object, such that:

```JavaScript
var PeerInfo = window.PeerInfo
```

#### Gotchas

You will need to use Node.js `Buffer` API compatible, if you are running inside the browser, you can access it by `PeerInfo.Buffer` or you can install Feross's [Buffer](https://github.com/feross/buffer).

