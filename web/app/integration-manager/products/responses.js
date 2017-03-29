import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createAction as createReduxAction} from 'redux-actions'

import * as Runtypes from 'runtypes'

const Breadcrumb = Runtypes.Record({
    href: Runtypes.String,
    text: Runtypes.String,
    title: Runtypes.String
})

const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Breadcrumb),
    uenc: Runtypes.String,
    formInfo: Runtypes.Always,
    itemQuantity: Runtypes.Number,
    ctaText: Runtypes.String
})

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

export const receiveProductDetailsProductData = createAction('Receive Product Details product data')

export const receiveProductListProductData = createAction('Receive ProductList product data')
