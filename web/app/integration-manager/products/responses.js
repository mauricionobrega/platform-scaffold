import {createAction as createReduxAction} from 'redux-actions'

import * as Runtypes from 'runtypes'
import {ProductUIData, ProductDetailsData, ProductDetailsListData} from './types'

const typecheck = (type, value) => {
    try {
        type.check(value)
    } catch (e) {
        console.info(e)
        console.log(value)
    }
    return value
}

const createTypedAction = (description, type) => createReduxAction(
    description,
    (payload) => typecheck(type, payload)
)

export const receiveProductDetailsUIData = createTypedAction(
    'Receive Product Details UI data',
    Runtypes.Dictionary(ProductUIData)
)

export const receiveProductDetailsProductData = createTypedAction(
    'Receive Product Details product data',
    Runtypes.Dictionary(ProductDetailsData)
)

export const receiveProductListProductData = createTypedAction(
    'Receive ProductList product data',
    Runtypes.Dictionary(ProductDetailsListData)
)
