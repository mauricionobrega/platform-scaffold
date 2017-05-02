import assign from 'lodash.assign'

import commands from './commands'
import reducer from './reducer'

const defaultConfig = {
    // Currently the Merlin's connector does not need any configuration
}

export const config = {}

const Connector = (cfg) => {
    assign(config, defaultConfig, cfg)
    return {commands, reducer}
}

export default Connector
