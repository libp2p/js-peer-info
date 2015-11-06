var test = require('tape')
var PeerId = require('peer-id')
var Multiaddr = require('multiaddr')
var PeerInfo = require('../src')

test('test creation', function (t) {
  var id = PeerId.create()
  var mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
  var pi = new PeerInfo(id, mh)
  t.ok(pi)
  t.end()
})
