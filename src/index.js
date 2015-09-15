/*
 * Peer represents a peer on the IPFS network
 */

var PeerId = require('peer-id')

exports = module.exports = Peer

function Peer (id, multiaddrs) {
  var self = this

  if (!(self instanceof Peer)) {
    throw new Error('Peer must be called with new')
  }

  if (!(id instanceof PeerId)) {
    throw new Error('Peer must be created with an instance of PeerId')
  }

  self.id = id
  self.multiaddrs = multiaddrs
}
