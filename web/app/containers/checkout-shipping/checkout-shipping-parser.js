const checkoutShippingParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'checkoutShipping Page',
        body
    }
}

export default checkoutShippingParser
