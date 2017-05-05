import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createTypedAction} from '../../utils/utils'
import {LocationList} from './types'

export const receiveCheckoutLocations = createTypedAction('Receive Checkout Locations', LocationList, 'locations')

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', ['shipping'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
