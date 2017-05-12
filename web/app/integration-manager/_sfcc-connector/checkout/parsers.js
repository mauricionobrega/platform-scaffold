/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const parseShippingAddressFromBasket = (basketData) => {
    const {
        customer_info: {
            email
        },
        shipments: [{
            shipping_address,
            shipping_method
        }]
    } = basketData

    let initialValues
    /* eslint-disable camelcase */
    if (shipping_address) {
        initialValues = {
            username: email,
            name: shipping_address.full_name,
            company: shipping_address.company_name,
            addressLine1: shipping_address.address1,
            addressLine2: shipping_address.address2,
            countryId: shipping_address.country_code,
            city: shipping_address.city,
            regionId: shipping_address.state_code,
            postcode: shipping_address.postal_code,
            telephone: shipping_address.phone,
            shipping_method: shipping_method ? shipping_method.id : undefined
        }
    } else {
        initialValues = {
            countryId: 'us'
        }
    }
    /* eslint-enable camelcase */

    return initialValues
}
