import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
// import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receivePlpProductData, receivePdpProductData} from '../../containers/catalog/products/actions'
import {urlToPathKey} from '../../utils/utils'

const initialState = Immutable.Map()

const productReducer = handleActions({
    [receivePdpProductData]: (state, {payload}) => {
        const fixedPayload = Immutable.Map().withMutations((p) => {
            Object.keys(payload).forEach((url) => {
                p.set(urlToPathKey(url), payload[url])
            })
        })

        return state.mergeDeep(fixedPayload)
    },
    [receivePlpProductData]: (state, {payload}) => {
        const fixedPayload = Immutable.Map().withMutations((p) => {
            Object.keys(payload).forEach((url) => {
                p.set(urlToPathKey(url), payload[url])
            })
        })

        return state.mergeDeepWith((prev, next) => prev || next, fixedPayload)
    }
}, initialState)

export default productReducer
