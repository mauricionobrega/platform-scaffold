/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction, urlToPathKey} from '../../utils/utils'
import productListParser from './parsers/product-list'
import {getSelectedCategory} from '../../containers/product-list/selectors'
import {getCurrentPathKey} from '../../containers/app/selectors'

export const receiveCategory = createAction('Receive Category Data')
export const changeFilter = createAction('Change Filter')
export const changeSortOption = createAction('Change Sort Option')

export const changeFilterTo = (filterQuery) => (dispatch, getStore) => {
    const currentState = getStore()
    const categoryData = getSelectedCategory(currentState).toJS()

    categoryData.filters.forEach((filter) =>
        filter.kinds.forEach((kind) => {
            kind.active = kind.query === filterQuery
        })
    )

    const newCategories = {[getCurrentPathKey(currentState)]: categoryData}
    dispatch(changeFilter(newCategories))
}

export const changeSort = (sortValue) => (dispatch, getStore) => {
    const currentState = getStore()
    const categoryData = getSelectedCategory(currentState).toJS()
    categoryData.sort.options.forEach((option) => {
        option.selected = option.value === sortValue
    })
    const currentCategory = {[getCurrentPathKey(currentState)]: categoryData}
    dispatch(changeSortOption(currentCategory))
}

export const process = ({payload}) => {
    const {$, $response, url} = payload

    return receiveCategory({
        [urlToPathKey(url)]: productListParser($, $response)
    })
}
