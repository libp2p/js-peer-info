/* eslint-env mocha */

const expect = require('chai').expect
const PeerId = require('peer-id')
const Multiaddr = require('multiaddr')
const PeerInfo = require('../src')

it('create peer-info', function (done) {
  this.timeout(6000)
  const id = PeerId.create()
  const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
  const pi = new PeerInfo(id, mh)
  expect(pi).to.exist
  done()
})
