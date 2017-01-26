import {createAction} from '../../utils/utils'
import {SELECTOR} from '../app/constants'

export const setCurrentPLPUrl = createAction('Set Current PLP URL', SELECTOR)

// Set the store's current selector to location.href so we
// can access it in our container, but only if we're on that href
export const process = ({payload: {url, currentURL}}) => {
    return url === currentURL ? setCurrentPLPUrl(url) : null
}
