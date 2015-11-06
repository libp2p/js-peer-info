/*
 * Peer represents a peer on the IPFS network
 */

exports = module.exports = Peer

function Peer (id, multiaddrs) {
  var self = this

  if (!(self instanceof Peer)) {
    throw new Error('Peer must be called with new')
  }

  if (!Array.isArray(multiaddrs)) {
    multiaddrs = [multiaddrs]
  }

  self.id = id
  self.multiaddrs = multiaddrs
}
