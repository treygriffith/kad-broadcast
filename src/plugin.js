import uuid from 'uuid'
import LruCache from 'lru-cache'
import BroadcastRules from './rules'

class BroadcastPlugin {
  static get BROADCAST_METHOD() {
    return 'BROADCAST'
  }

  /**
   * @constructor
   * @param {KademliaNode} node
   */
  constructor(node, listener) {
    const handlers = new BroadcastRules(this, listener)
    this.cached = new LruCache(constants.LRU_CACHE_SIZE)
    this.node = node
    this.broadcast = this.broadcast.bind(this)
    this.node.use(BroadcastPlugin.BROADCAST_METHOD, handlers.broadcast.bind(handlers))
  }

  broadcast(contents) {
    const messageId = uuid.v4()
    return this.broadcastToHeight(messageId, contents, 0)
  }

  broadcastToHeight(messageId, contents, height) {
    return new Promise((resolve, reject) => {
      let allNodes = 0

      function done() {
        if(--allNodes === 0) {
          resolve()
        }
      }

      for(var i=height; i<constants.B; i++) {
        let nodes = knuthShuffle(this.broadcaster.node.router.get(i).entries()).splice(0, constants.R)
        allNodes += nodes.length
        nodes.forEach(node => {
          this.node.send(BroadcastPlugin.BROADCAST_METHOD, { uuid: messageId, contents: contents, height: i + 1 }, node, done)
        })
      }

      if(allNodes.length === 0) {
        resolve()
      }
    })
  }
}