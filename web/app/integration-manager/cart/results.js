/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createTypedAction} from '../../utils/utils'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {Cart} from './types'

export const receiveCartContents = createTypedAction('Receive Cart Contents', Cart)
export const receiveCartCustomContent = createAction('Receive Cart Custom Contents', ['custom'])