/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const checkoutPaymentParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'checkoutPayment Page',
        body
    }
}

export default checkoutPaymentParser
