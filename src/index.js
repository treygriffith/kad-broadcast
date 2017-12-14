/**
 * @module kad-broadcast
 */

import Plugin from './plugin'
import Rules from './rules'
import constants from './constants'

/**
 * Registers the Broadcast implementation as a Kad plugin
 * @param {KademliaNode} node
 */
export default function (node) {
  return new Plugin(node)
}

export { Plugin, Rules, constants }