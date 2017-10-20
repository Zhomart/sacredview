import createLogger from 'vuex/dist/logger'

import config from '../../config'
import localStoragePlugin from './localStoragePlugin.js'

let plugins = [localStoragePlugin];

if (config.debug) {
  plugins = [createLogger()].concat(plugins)
}

export default plugins
