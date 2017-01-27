import {createAction} from '../../utils/utils'
import homeParser from './parsers/home'

export const receiveData = createAction('Receive Home Page Data')

export const process = ({payload: {$, $response}}) => receiveData(homeParser($, $response))
