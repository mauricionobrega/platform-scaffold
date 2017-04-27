import {createAction} from '../../utils/utils'
import {startersKitParser} from './parser.js'

export const receiveData = createAction('Receive StartersKit data')
export const process = ({payload}) => {
    const {$, $response} = payload
    const parsed = startersKitParser($, $response)
    return receiveData(parsed)
}

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change StartersKit title', 'title')

