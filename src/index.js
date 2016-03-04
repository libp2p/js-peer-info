/*
 * Peer represents a peer on the IPFS network
 */

const Id = require('peer-id')

exports = module.exports = Peer

function Peer (peerId) {
  if (!(this instanceof Peer)) {
    return new Peer(peerId)
  }

  if (!peerId) {
    this.id = Id.create()
  } else {
    this.id = peerId
  }

  this.multiaddrs = []
  const observedMultiaddrs = []

  this.multiaddr = {}

  this.multiaddr.add = (multiaddr) => {
    var exists = false
    this.multiaddrs.some((m, i) => {
      if (m.toString() === multiaddr.toString()) {
        exists = true
        return true
      }
    })
    if (!exists) {
      this.multiaddrs.push(multiaddr)
    }
  }

  // to prevent multiaddr explosion
  this.multiaddr.addSafe = (multiaddr) => {
    var check = false
    observedMultiaddrs.some((m, i) => {
      if (m.toString() === multiaddr.toString()) {
        this.multiaddr.add(multiaddr)
        observedMultiaddrs.splice(i, 1)
        check = true
      }
    })
    if (!check) {
      observedMultiaddrs.push(multiaddr)
    }
  }

  this.multiaddr.rm = (multiaddr) => {
    this.multiaddrs.some((m, i) => {
      if (m.toString() === multiaddr.toString()) {
        this.multiaddrs.splice(i, 1)
        return true
      }
    })
  }

  this.multiaddr.replace = (existing, fresh) => {
    if (!Array.isArray(existing)) {
      existing = [existing]
    }
    if (!Array.isArray(fresh)) {
      fresh = [fresh]
    }
    existing.forEach((m) => {
      this.multiaddr.rm(m)
    })
    fresh.forEach((m) => {
      this.multiaddr.add(m)
    })
  }

  // TODO: add features to fetch multiaddr using filters
  // look at https://github.com/whyrusleeping/js-mafmt/blob/master/src/index.js
}
