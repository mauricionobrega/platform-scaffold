/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {extractMagentoShippingStepData} from '../../../utils/magento-utils'




const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoShippingStepData($html)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title'])
    }
}

export default checkoutShippingParser
