import {createAction} from '../../utils/utils'

export const openModal = createAction('Open modal')
export const closeModal = createAction('Close modal')
export const closeAllModals = createAction('Close all modals')

export const receiveModalContents = createAction('Receive Modal Contents')
