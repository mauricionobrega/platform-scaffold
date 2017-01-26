import {createAction} from '../../utils/utils'
import plpParser from './parsers/plp'
import {SELECTOR} from '../app/constants'
import {receiveCategory} from '../../store/categories/actions'

export const setCurrentPLPUrl = createAction('Set Current PLP URL', SELECTOR)

export const process = ({payload}) => (dispatch) => {
    const {$, $response, url, currentURL} = payload

    // Also set the store's current selector to location.href so we
    // can access it in our container, but only if we're on that href
    if (url === currentURL) {
        dispatch(setCurrentPLPUrl(url))
    }
    dispatch(receiveCategory({[new URL(url).pathname]: plpParser($, $response)}))
}
