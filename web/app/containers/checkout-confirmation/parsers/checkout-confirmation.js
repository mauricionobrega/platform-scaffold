/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const checkoutConfirmationParser = ($, $html) => {
    const $checkoutSuccess = $html.find('.checkout-success')
    const $orderInSpan = $checkoutSuccess.find('p span')
    const $orderInAnchor = $checkoutSuccess.find('p a')

    return {
        orderNumber: $orderInSpan.length ? $orderInSpan.text() : $orderInAnchor.text(),
        orderUrl: $orderInAnchor.length ? $orderInAnchor.attr('href') : ''
    }
}

export default checkoutConfirmationParser
