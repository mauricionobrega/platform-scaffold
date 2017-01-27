const checkoutConfirmationParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'checkoutConfirmation Page',
        body
    }
}

export default checkoutConfirmationParser
