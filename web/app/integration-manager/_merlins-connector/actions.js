import {createAction} from '../../utils/utils'

// Add other actions here that are specific to this connector.
// Actions that are returned out of the connector and reduced
// by the app should go into ./responses.js

export const receiveFormInfo = createAction('Receive Form Info')
export const receiveEntityID = createAction('Receive Customer Entity ID')
