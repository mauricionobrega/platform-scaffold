const checkoutPaymentParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'checkoutPayment Page',
        body
    }
}

export default checkoutPaymentParser
