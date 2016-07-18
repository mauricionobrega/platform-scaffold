// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

<% print(context.containers.map((container) => `import ${container.identifier} from './${container.directory}/reducer'`).join('\n')) %>

const rootReducer = combineReducers({
<% print(context.containers.map((container) => `    ${container.identifier},`).join('\n')) %>
})

export default rootReducer
