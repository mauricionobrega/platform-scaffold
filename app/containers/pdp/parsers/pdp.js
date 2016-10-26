import {extractMagentoJson} from '../../../utils/magento-utils'

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup
}

const parseAddToCartForm = ($, $form) => {
    return {
        submitUrl: $form.attr('action'),
        hiddenInputs: $form.find('input[type="hidden"]')
            .map((idx, input) => {
                const $input = $(input)
                return {
                    name: $input.attr('name'),
                    value: $input.val()
                }
            })
            .get()
    }
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
            ...parseAddToCartForm($, $mainContent.find('#product_addtocart_form'))
        }
    }
}

export default pdpParser
