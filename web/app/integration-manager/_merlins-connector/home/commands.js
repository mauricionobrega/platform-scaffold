import {fetchPageData} from '../app/commands'
import homeParser from './parser'
import {receiveHomeData} from '../../results'

export const fetchHomeData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
        })
}
