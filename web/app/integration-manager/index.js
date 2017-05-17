/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as commands from './commands'
import * as reducer from './reducer'

export const registerConnector = (connector) => {
    commands.register(connector.commands)
    reducer.register(connector.reducer)
}

// this isn't necessary, just useful
export {commands, reducer}
