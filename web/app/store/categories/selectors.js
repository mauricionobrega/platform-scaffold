/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCategories, getProducts} from '../selectors'
import {getCurrentPathKey} from '../../containers/app/selectors'
import {PLACEHOLDER} from '../../containers/app/constants'

export const getSelectedCategory = createGetSelector(
    getCategories,
    getCurrentPathKey,
    Immutable.Map()
)

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getCategoryProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)
export const getCategoryItemCount = createGetSelector(getSelectedCategory, 'itemCount')
export const getCategoryTitle = createGetSelector(getSelectedCategory, 'title')
export const getCategoryParentID = createGetSelector(getSelectedCategory, 'parentId', null)
export const getCategorySearchTerm = createGetSelector(getSelectedCategory, 'searchTerm')
export const getCategoryCustomContent = createGetSelector(getSelectedCategory, 'custom')

export const getCategoryParent = createSelector(
    getCategories,
    getCategoryParentID,
    (categories, parentId) => {
        return (parentId && categories.find((category) => category.get('id') === parentId)) || Immutable.Map()
    }
)

export const getCategoryParentTitle = createGetSelector(
    getCategoryParent,
    'title',
    'Home'
)

export const getCategoryParentHref = createGetSelector(
    getCategoryParent,
    'href',
    '/'
)

export const getCategoryProducts = createSelector(
    getProducts,
    getCategoryProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)
