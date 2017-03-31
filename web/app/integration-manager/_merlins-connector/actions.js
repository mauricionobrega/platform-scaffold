import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

// Add other actions here that are specific to this connector.
// Actions that are returned out of the connector and reduced
// by the app should go into ./responses.js

export const receiveFormInfo = createAction('Receive Form Info')
export const receiveEntityID = createAction('Receive Customer Entity ID', ['customerEntityID'])
export const receiveFormKey = createAction('Receive Form Key', ['formKey'])
export const receiveLoginHref = createAction('Receive Login Href', ['loginHref'])
export const receiveRegisterHref = createAction('Receive Register Href', ['registerHref'])