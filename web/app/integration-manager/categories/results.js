/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'redux-actions'

import {typecheck, createTypedAction} from '../../utils/utils'
import {CategoryID} from '../types'
import {CategoryInfo, CategoryContents, Categories} from './types'

export const receiveCategoryInformation = createAction(
    'Receive Category Information',
    (id, info) => ({
        [typecheck(CategoryID, id)]: typecheck(CategoryInfo, info)
    })
)

export const receiveCategoryContents = createAction(
    'Receive Category Contents',
    (id, contents) => ({
        [typecheck(CategoryID, id)]: typecheck(CategoryContents, contents)
    })
)

export const receiveCategory = createTypedAction(
    'Receive Category data',
    Categories
)
