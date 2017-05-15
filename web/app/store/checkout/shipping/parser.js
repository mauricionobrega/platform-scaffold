/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const getNameValue = (firstname, lastname) => {
    let name
    if (firstname.value) {
        name = `${firstname.value} `
    }
    if (lastname.value) {
        name += lastname.value
    }

    return name
}

export const parseShippingInitialValues = (shippingFieldData) => {
    const fieldData = shippingFieldData.toJS()
    const streetFields = fieldData.street.children

    const shippingData = {
        name: getNameValue(fieldData.firstname, fieldData.lastname),
        addressLine1: streetFields[0].value,
        company: fieldData.company.value,
        addressLine2: streetFields[1].value,
        billing_same_as_shipping: true
    }

    if (fieldData.telephone.value) {
        shippingData.telephone = fieldData.telephone.value
    }

    if (fieldData.city.value) {
        shippingData.city = fieldData.city.value
    }

    if (fieldData.postcode.value) {
        shippingData.postcode = fieldData.postcode.value
    }

    if (fieldData.country_id.value) {
        shippingData.countryId = fieldData.country_id.value
    }

    if (fieldData.region_id.value) {
        shippingData.regionId = fieldData.region_id.value
    }

    return shippingData
}

export const parseShippingMethods = (shippingMethods) => {
    if (!shippingMethods || !shippingMethods.map) {
        return []
    }
    return shippingMethods.map((method) => {
        return {
            label: `${method.method_title}`,
            info: `${method.carrier_title}`,
            cost: `$${method.price_incl_tax.toFixed(2)}`,
            value: `${method.carrier_code}_${method.method_code}`
        }
    })
}
