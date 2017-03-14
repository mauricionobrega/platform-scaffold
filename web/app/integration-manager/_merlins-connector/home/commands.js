import {fetchPageData} from '../app/commands'
import homeParser from './parser'
import {receiveHomeData} from '../../responses'

export const fetchHomeData = (url, routeName) => (dispatch) => {
    return dispatch(fetchPageData(url, routeName))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
        })
}
