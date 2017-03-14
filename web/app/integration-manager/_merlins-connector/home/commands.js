import {fetchPageData} from '../utils'
import homeParser from './parser'
import {receiveHomeData} from '../../responses'

export const fetchHomeData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
        })
}

