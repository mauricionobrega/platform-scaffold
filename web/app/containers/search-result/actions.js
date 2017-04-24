import {createAction} from '../../utils/utils'

export const receiveData = createAction('Receive SearchResult data')

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change SearchResult title', 'title')
