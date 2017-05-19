import {createAction} from '../../utils/utils'
import {privacyPageParser} from './parser.js'

export const receiveData = createAction('Receive PrivacyPage data')

export const process = ({payload}) => {
    const {$, $response} = payload
    const parsed = privacyPageParser($, $response)
    return receiveData(parsed)
}

// This action will change the `title` key in the local private state
// export const changeTitle = createAction('Change PrivacyPage title', 'title')
