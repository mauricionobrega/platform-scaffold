import {createTypedAction} from '../../utils/utils'
import {Cart} from './types'

export const receiveCartContents = createTypedAction('Receive Cart Contents', Cart)
