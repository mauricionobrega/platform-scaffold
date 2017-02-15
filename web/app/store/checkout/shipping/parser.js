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

const parseShippingInitialValues = (shippingFieldData) => {
    const fieldData = shippingFieldData.toJS()
    const streetFields = fieldData.street.children
    return {
        name: getNameValue(fieldData.firstname, fieldData.lastname),
        addressLine1: streetFields[0].value,
        company: fieldData.company.value,
        addressLine2: streetFields[1].value,
        city: fieldData.city.value,
        country_id: fieldData.country_id.value,
        region_id: fieldData.region_id.value,
        postcode: fieldData.postcode.value,
        telephone: fieldData.telephone.value,
        billing_same_as_shipping: true
    }
}

export default parseShippingInitialValues
