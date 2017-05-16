/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {receiveSavedShippingAddresses} from '../actions'

export const setDefaultShippingAddressId = createAction('Receive default shipping address ID', 'defaultShippingAddressId')

export const fetchSavedShippingAddresses = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const isNotLoggedIn = !getIsLoggedIn(currentState)

        if (isNotLoggedIn) {
            return false
        }

        const fetchURL = `/rest/default/V1/carts/mine`
        return makeRequest(fetchURL, {method: 'GET'})
            .then((response) => response.json())
            .then(({customer}) => {
                let defaultShippingId
                const addresses = customer.addresses.map((address) => {
                    if (address.default_shipping) {
                        defaultShippingId = address.id
                    }

                    // Not spreading `address` because it has key/values that
                    // we want to rename and remove
                    return {
                        city: address.city,
                        countryId: address.country_id,
                        customerAddressId: `${address.id}`,
                        customerId: `${address.customer_id}`,
                        firstname: address.firstname,
                        lastname: address.lastname,
                        postcode: address.postcode,
                        regionCode: address.region.region_code,
                        regionId: `${address.region.region_id}`,
                        region: address.region.region,
                        street: address.street,
                        telephone: address.telephone,
                    }
                })

                dispatch(setDefaultShippingAddressId(defaultShippingId))
                dispatch(receiveSavedShippingAddresses(addresses))
            })
    }
}
