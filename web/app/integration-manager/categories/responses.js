import {Dictionary} from 'runtypes'

import {createTypedAction} from '../../utils/utils'
import {CategoryInfo, CategoryContents, Categories} from './types'

export const receiveCategoryInformation = createTypedAction(
    'Receive Category Information',
    Dictionary(CategoryInfo)
)

export const receiveCategoryContents = createTypedAction(
    'Receive Category Contents',
    Dictionary(CategoryContents)
)

export const receiveCategory = createTypedAction(
    'Receive Category data',
    Categories
)
