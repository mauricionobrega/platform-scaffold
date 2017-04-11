import {extractMagentoShippingStepData} from '../../../utils/magento-utils'


export const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoShippingStepData($html)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title'])
    }
}

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
    return {
        name: getNameValue(fieldData.firstname, fieldData.lastname),
        addressLine1: streetFields[0].value,
        company: fieldData.company.value,
        addressLine2: streetFields[1].value,
        city: fieldData.city.value,
        countryId: fieldData.country_id.value,
        regionId: fieldData.region_id.value,
        postcode: fieldData.postcode.value,
        telephone: fieldData.telephone.value,
        billing_same_as_shipping: true
    }
}

export const parseLocations = (shippingStepData) => {
    if (!shippingStepData) {
        return {}
    }

    return {
        locations: {
            countries: shippingStepData.getIn(['country_id', 'options']),
            regions: shippingStepData.getIn(['region_id', 'options'])
        }
    }
}

export const parseCheckoutData = ($response) => {
    const magentoFieldData = extractMagentoShippingStepData($response).getIn(['children', 'shipping-address-fieldset', 'children'])
    const initialValues = parseShippingInitialValues(magentoFieldData)
    const locationsData = parseLocations(magentoFieldData)
    return {
        ...locationsData,
        shipping: {initialValues}
    }
}

export const parseShippingMethods = (shippingMethods) => {
    if (!shippingMethods || !shippingMethods.map) {
        return []
    }
    return shippingMethods.map((method) => {
        return {
            label: `${method.method_title} - ${method.carrier_title}`,
            cost: `$${method.price_incl_tax.toFixed(2)}`,
            value: `${method.carrier_code}_${method.method_code}`
        }
    })
}
