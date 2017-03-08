import {createAction} from '../../utils/utils'
import {parseNavigation} from './parser'

export const receiveData = createAction('Receive navigation data')

export const process = ({payload}) => {
    const {$, $response} = payload
    return receiveData(parseNavigation($, $response))
}
