import {createAction} from '../utils/utils'

export const receiveHomeData = createAction('Receive Home Data')
export const receiveNavigationData = createAction('Receive Navigation Data')
export const receiveFooterData = createAction('Receive Footer Data')
export const receiveCategory = createAction('Receive Category Data')
export const setPageFetchError = createAction('Set page fetch error', 'fetchError')
export const receiveAppData = createAction('Receive App Data')
