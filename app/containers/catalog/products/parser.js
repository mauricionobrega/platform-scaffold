import {extractMagentoJson} from '../../../utils/magento-utils'
import {parseTextLink, parseImage} from '../../../utils/parser-utils'

export const plpParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const link = parseTextLink($product.find('.product-item-link'))
        const img = parseImage($product.find('.product-image-photo'))
        productMap[link.href] = {
            title: link.text.trim(),
            price: $product.find('.price').text(),
            link,
            image: img,
            carouselItems: [
                {
                    img: img.src,
                    position: '0'
                }
            ]
        }
    })
    return productMap
}

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup
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
