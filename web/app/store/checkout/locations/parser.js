/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const parseLocations = (shippingStepData) => {
    if (!shippingStepData) {
        return {}
    }

    return {
        locations: {
            countries: shippingStepData.getIn(['country_id', 'options']),
            regions: shippingStepData.getIn(['region_id', 'options'])
        }
    }
}

export default parseLocations
