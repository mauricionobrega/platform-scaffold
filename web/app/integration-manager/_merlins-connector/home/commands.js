import {fetchPageData} from '../app/commands'
import homeParser from './parser'
import {receiveHomeData} from '../../results'

export const initHomePage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
        })
}
