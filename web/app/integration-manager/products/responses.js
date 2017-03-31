import * as Runtypes from 'runtypes'
import {ProductUIData, ProductDetailsData, ProductDetailsListData} from './types'
import {createTypedAction} from '../../utils/utils'

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
