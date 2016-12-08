import {extractMagentoJson} from '../../../utils/magento-utils'
import {parseTextLink, parseImage} from '../../../utils/parser-utils'

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup.toJS()
}

export const plpParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const link = parseTextLink($product.find('.product-item-link'))
        const image = parseImage($product.find('.product-image-photo'))
        productMap[link.href] = {
            title: link.text.trim(),
            price: $product.find('.price').text(),
            link,
            image,
            carouselItems: [
                {
                    img: image.src,
                    position: '1'
                }
            ]
        }
    })
    return productMap
}

export const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const magentoObject = extractMagentoJson($html)
    return {
        title: $mainContent.find('.page-title-wrapper.product .page-title > span').text(),
        price: $mainContent.find('.product-info-price .price-wrapper .price').text(),
        carouselItems: parseCarouselItems(magentoObject),
        description: $mainContent.find('.product.info.detailed .product.attibute.description p').text()
    }
}
