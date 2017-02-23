import {createAction} from '../../utils/utils'

export const receiveData = createAction('Receive StartersKit data')

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change StartersKit title', 'title')
