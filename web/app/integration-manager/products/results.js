/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as Runtypes from 'runtypes'
import {Products, ProductUIData} from './types'
import {createTypedAction} from '../../utils/utils'

export const receiveProductDetailsUIData = createTypedAction(
    'Receive Product Details UI data',
    Runtypes.Dictionary(ProductUIData)
)

export const receiveProductDetailsProductData = createTypedAction(
    'Receive Product Details product data',
    Products
)

export const receiveProductListProductData = createTypedAction(
    'Receive ProductList product data',
    Products
)

export const receiveCartProductData = createTypedAction(
    'Receive Cart product data',
    Products
)
