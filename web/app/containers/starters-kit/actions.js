import {createAction} from '../../utils/utils'
import {startersKitParser} from './parsers/startersKit'

export const receiveData = createAction('Receive StartersKit data')
export const process = ({payload}) => {
    const {$, $response} = payload
    const parsed = startersKitParser($, $response)
    return receiveData(parsed)
}

export const receiveShowAll = createAction('Toggle show all starter products', 'showAll')
export const showAll = () => (dispatch) => {
    dispatch(receiveShowAll(true))
}
export const showSome = () => (dispatch) => {
    dispatch(receiveShowAll(false))
}
