import {createAction} from '../../utils/utils'

import parseLocations from './locations/parser'

export const receiveShippingLocations = createAction('Receive Checkout Shipping Location data')


export const processShippingLocations = ({payload: {$response}}) =>
    receiveShippingLocations(parseLocations($response))
