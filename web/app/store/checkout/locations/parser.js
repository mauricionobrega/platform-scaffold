import {extractMegentoShippingStepData} from '../../../utils/magento-utils'

const parseLocations = ($html) => {
    const shippingStepData = extractMegentoShippingStepData($html)
    const fieldData = shippingStepData.getIn(['children', 'shipping-address-fieldset', 'children'])

    return {
        locations: {
            countries: fieldData.getIn(['country_id', 'options']),
            regions: fieldData.getIn(['region_id', 'options'])
        }
    }
}

export default parseLocations
