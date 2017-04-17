import {createTypedAction} from '../../utils/utils'
import {Cart} from './types'

export const receiveCartContents = createTypedAction('Received Cart Contents', Cart)
