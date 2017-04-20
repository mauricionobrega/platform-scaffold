import {createAction, urlToPathKey} from '../../utils/utils'
import productListParser from './parsers/product-list'
import {getCurrentPathKey} from '../../containers/app/selectors'
import {getSelectedCategory} from '../../containers/product-list/selectors'

export const receiveCategory = createAction('Receive Category Data')
export const changeSort = createAction('Change Sort Option')

export const changeSortIn = (sortValue) => (dispatch, getStore) => {
    const currentState = getStore()
    const categoryData = getSelectedCategory(currentState).toJS()
    categoryData.sort.options.forEach((option) => {
        option.selected = option.value === sortValue
    })
    const currentCategory = {[getCurrentPathKey(currentState)]: categoryData}
    dispatch(changeSort(currentCategory))
}

export const process = ({payload}) => {
    const {$, $response, url} = payload

    return receiveCategory({
        [urlToPathKey(url)]: productListParser($, $response)
    })
}
