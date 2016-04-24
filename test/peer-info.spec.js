/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const PeerId = require('peer-id')
const Multiaddr = require('multiaddr')
const PeerInfo = require('../src')

describe('peer-info', function () {
  this.timeout(20000)

  it('create with Id', () => {
    const id = PeerId.create()
    const pi = new PeerInfo(id)
    expect(pi).to.exist
    expect(pi.id).to.exist
    expect(pi.id).to.deep.equal(id)
  })

  it('create without passing an Id', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    expect(pi.id).to.exist
  })

  it('create without "new"', () => {
    const pi = PeerInfo()
    expect(pi).to.exist
    expect(pi.id).to.exist
  })

  it('add multiaddr', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
  })

  it('add multiaddr that are buffers', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh.buffer)
    expect(pi.multiaddrs[0] instanceof Multiaddr).to.equal(true)
  })

  it('add repeated multiaddr', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
  })

  it('rm multiaddr', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.add(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    pi.multiaddr.rm(mh)
    expect(pi.multiaddrs.length).to.equal(0)
  })

  it('addSafe - avoid multiaddr explosion', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/9002')
    const mh3 = Multiaddr('/ip4/127.0.0.1/tcp/9009')
    pi.multiaddr.addSafe(mh)
    expect(pi.multiaddrs.length).to.equal(0)
    pi.multiaddr.addSafe(mh)
    expect(pi.multiaddrs.length).to.equal(1)
    pi.multiaddr.addSafe(mh2)
    pi.multiaddr.addSafe(mh3)
    expect(pi.multiaddrs.length).to.equal(1)
  })

  it('addSafe - multiaddr that are buffers', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    pi.multiaddr.addSafe(mh.buffer)
    pi.multiaddr.addSafe(mh.buffer)
    expect(pi.multiaddrs[0] instanceof Multiaddr).to.equal(true)
  })

  it('replace multiaddr', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh1 = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/5002')
    const mh3 = Multiaddr('/ip4/127.0.0.1/tcp/5003')
    const mh4 = Multiaddr('/ip4/127.0.0.1/tcp/5004')
    const mh5 = Multiaddr('/ip4/127.0.0.1/tcp/5005')
    const mh6 = Multiaddr('/ip4/127.0.0.1/tcp/5006')

    pi.multiaddr.add(mh1)
    pi.multiaddr.add(mh2)
    pi.multiaddr.add(mh3)
    pi.multiaddr.add(mh4)

    expect(pi.multiaddrs.length).to.equal(4)

    const old = [mh2, mh4]
    const fresh = [mh5, mh6]

    pi.multiaddr.replace(old, fresh)

    expect(pi.multiaddrs.length).to.equal(4)
  })

  it('replace multiaddr (no arrays)', () => {
    const pi = new PeerInfo()
    expect(pi).to.exist
    const mh1 = Multiaddr('/ip4/127.0.0.1/tcp/5001')
    const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/5002')
    const mh3 = Multiaddr('/ip4/127.0.0.1/tcp/5003')
    const mh4 = Multiaddr('/ip4/127.0.0.1/tcp/5004')
    const mh5 = Multiaddr('/ip4/127.0.0.1/tcp/5005')

    pi.multiaddr.add(mh1)
    pi.multiaddr.add(mh2)
    pi.multiaddr.add(mh3)
    pi.multiaddr.add(mh4)

    expect(pi.multiaddrs.length).to.equal(4)

    const old = mh2
    const fresh = mh5

    pi.multiaddr.replace(old, fresh)

    expect(pi.multiaddrs.length).to.equal(4)
  })
})
