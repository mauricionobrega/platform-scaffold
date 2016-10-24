import {extractMagentoJson} from '../../../utils/magento-utils'

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup
}

const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')

    const magentoObject = extractMagentoJson($html)

    return {
        product: {
            title: $mainContent.find('.page-title-wrapper.product .page-title > span').text(),
            price: $mainContent.find('.product-info-price .price-wrapper .price').text(),
            carouselItems: parseCarouselItems(magentoObject),
            description: $mainContent.find('.product.info.detailed .product.attibute.description p').text(),
        }
    }
}

export default pdpParser
