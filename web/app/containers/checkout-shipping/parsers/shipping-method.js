const shippingMethodParser = (shippingMethods) => {
    return shippingMethods.map((method) => {
        return {
            label: `${method.method_title} - ${method.carrier_title}`,
            cost: `$${method.price_incl_tax.toFixed(2)}`,
            value: `${method.carrier_code}_${method.method_code}`
        }
    })
}

export default shippingMethodParser
