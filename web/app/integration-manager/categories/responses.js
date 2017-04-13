import {Dictionary} from 'runtypes'

import {createTypedAction} from '../../utils/utils'
import {CategoryInfo, Categories} from './types'

export const receiveCategoryInformation = createTypedAction(
    'Receive Category Information',
    Dictionary(CategoryInfo)
)

export const receiveCategory = createTypedAction(
    'Receive Category data',
    Categories
)
