import {createTypedAction} from '../../utils/utils'
import {Categories} from './types'

export const receiveCategory = createTypedAction(
    'Receive Category data',
    Categories
)
