import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const openModal = createAction('Open modal')
export const closeModal = createAction('Close modal')
export const closeAllModals = createAction('Close all modals')

export const receiveModalContents = createAction('Receive Modal Contents')
