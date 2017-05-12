/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {parseNavigation} from './parser'

export const setNavigationPath = createAction('Set Navigation Path', ['path'])
export const receiveData = createAction('Receive navigation data')

export const process = ({payload}) => {
    const {$, $response} = payload
    return receiveData(parseNavigation($, $response))
}
