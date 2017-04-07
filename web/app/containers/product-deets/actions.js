import {createAction, urlToPathKey} from '../../utils/utils'

import productDeetsParser from './parsers/product-deets'

export const receiveData = createAction('Receive Product Deets data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = productDeetsParser($, $response)
    return receiveData({[urlToPathKey(url)]: parsed})
}
