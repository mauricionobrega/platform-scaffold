const shippingMethodParser = (shippingMethods) => {
    return shippingMethods.map((method) => {
        return {
            label: `${method.method_title} - ${method.carrier_title}`,
            cost: `$${method.price_incl_tax.toFixed(2)}`
        }
    })
}

export default shippingMethodParser
