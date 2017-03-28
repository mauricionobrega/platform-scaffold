import {createAction} from '../../utils/utils'

export const receiveFormInfo = createAction('Receive Form Info')

export const receiveFormKey = createAction('Receive Form Key', 'formKey')

export const receiveLoginHref = createAction('Receive Login Href', 'loginHref')

export const receiveRegisterHref = createAction('Receive Register Href', 'registerHref')
