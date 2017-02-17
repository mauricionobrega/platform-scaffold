import {createAction, urlToPathKey} from '../../utils/utils'
import productListParser from './parsers/product-list'

export const receiveCategory = createAction('Receive Category Data')

export const process = ({payload}) => {
    const {$, $response, url} = payload

    return receiveCategory({
        [urlToPathKey(url)]: productListParser($, $response)
    })
}
