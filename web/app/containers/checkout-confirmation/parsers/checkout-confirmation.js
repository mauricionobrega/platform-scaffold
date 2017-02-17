const checkoutConfirmationParser = ($, $html) => {
    const $checkoutSuccess = $html.find('.checkout-success')
    const $orderInSpan = $checkoutSuccess('p span')
    const $orderInAnchor = $checkoutSuccess('p a')

    return {
        orderNumber: $orderInSpan.length ? $orderInSpan.text() : $orderInAnchor.text(),
        orderUrl: $orderInAnchor.length ? $orderInAnchor.attr('href') : ''
    }
}

export default checkoutConfirmationParser
