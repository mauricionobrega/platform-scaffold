/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {fetchPageData} from '../app/commands'
import homeParser from './parser'
import {receiveHomeData, receiveUserCustomContent} from '../../results'
import {receiveCheckoutCustomContent} from '../../checkout/results'
import {receiveCartCustomContent} from '../../cart/results'

export const initHomePage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
            // For Testing purposes, don't merge this into develop
            dispatch(receiveUserCustomContent({test: 'user content'}))
            dispatch(receiveCheckoutCustomContent({test: 'checkout content'}))
            dispatch(receiveCartCustomContent({test: 'cart content'}))
        })
}
