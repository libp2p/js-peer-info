/* eslint-env mocha */

const expect = require('chai').expect
const Id = require('peer-id')
const Multiaddr = require('multiaddr')
const PeerInfo = require('../src')

describe('peer-info', function (done) {
  this.timeout(10000)

  it('create with Id', (done) => {
    const id = Id.create()
    const pi = new PeerInfo(id)
    expect(pi).to.exist
    expect(pi.id).to.exist
    expect(pi.id).to.deep.equal(id)
    done()
  })

  it('create without passing an Id', (done) => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    expect(pi.id).to.exist
    done()
  })

  it('add multiaddr', (done) => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    done()
  })

  it('add repeated multiaddr', (done) => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    done()
  })

  it('rm multiaddr', (done) => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    pi.multiaddr.rm(mh)
    expect(pi.multiaddrs.length).to.equal(0)
    done()
  })

  it('addSafe - avoid multiaddr explosion', (done) => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.addSafe(mh)
    expect(pi.multiaddrs.length).to.equal(0)
    pi.multiaddr.addSafe(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    done()
  })
})
