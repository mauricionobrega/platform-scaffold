import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const toggleHeader = createAction('Toggled the header', ['isCollapsed'])
