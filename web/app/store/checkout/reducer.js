import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'

// const initialState = Immutable.Map()

// TEMPORARY
const initialState = Immutable.Map({
    shipping: {
        firstname: 'Billy',
        lastname: 'Bob',
        company: 'My Company',
        telephone: '333-222-1111',
        fax: '',
        street: ['Shipping Street Ave.', 'App #'],
        city: 'Vancouver',
        region_id: '67',
        region: '',
        postcode: 'V5V 5V5',
        country_id: 'CA',
        save_in_address_book: true,
    },
    payment: {
        firstname: 'John',
        lastname: 'Doe',
        company: 'Blank Inc.',
        telephone: '111-222-333',
        fax: '',
        street: ['Billing Ave st.'],
        city: 'Vancouver',
        region_id: '67',
        region: '',
        postcode: 'V5V 5V5',
        country_id: 'CA',
        save_in_address_book: true,
    }
})

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, receiveShippingMethodInitialValues)
}, initialState)

export default productReducer
