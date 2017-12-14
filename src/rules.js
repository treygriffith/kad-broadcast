import constants from './constants'
import { knuthShuffle } from 'knuth-shuffle'

/**
 * Implements the handlers for Broadcast message types
 */
class BroadcastRules {
  /**
   * @constructor
   * @param {BroadcastPlugin} broadcaster - Instance of a initialized broadcast plugin
   */
  constructor(broadcaster) {
    this.broadcaster = broadcaster
  }

  async broadcast(request, response, next) {
    let { uuid, contents, height } = request.params

    if(this.broadcaster.cached.get(uuid)) {
      return next(new Error('Message previously routed'));
    }

    this.broadcaster.cached.set(uuid, Date.now())
    await this.broadcaster.broadcastToHeight(uuid, contents, height)
    response.send([])
  }

}

export default BroadcastRules