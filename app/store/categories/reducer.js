import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCategory} from './actions'
import {receiveData as receivePlpData} from '../../containers/plp/actions'

const initialState = Immutable.Map()

const getPath = (href) => new URL(href).pathname

const categoryReducer = handleActions({
    ...mergePayloadForActions(receiveCategory),
    // This is an interim measure
    [receivePlpData]: (state, {payload}) => {
        const {selector} = payload

        const category = payload[selector]
        const path = getPath(selector)
        return state.mergeDeep({
            [path]: {
                title: category.title,
                itemCount: category.numItems,
                products: category.productUrls.map(getPath),
                noResultsText: category.noResultsText
            }
        })
    }
}, initialState)

export default categoryReducer
