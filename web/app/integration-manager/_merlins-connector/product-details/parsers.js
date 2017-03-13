import {extractMagentoJson} from '../../../utils/magento-utils'
import {getTextFrom} from '../../../utils/parser-utils'

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup.toJS()
}

export const productDetailsParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const magentoObject = extractMagentoJson($html)
    return {
        title: getTextFrom($mainContent, '.page-title-wrapper.product .page-title > span'),
        price: getTextFrom($mainContent, '.product-info-price .price-wrapper .price'),
        carouselItems: parseCarouselItems(magentoObject),
        description: getTextFrom($mainContent, '.product.info.detailed .product.attibute.description p')
    }
}

export const pdpAddToCartFormParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const $form = $mainContent.find('#product_addtocart_form')

    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })

    return {
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        },
        itemQuantity: parseInt($form.find('#qty').val()),
        ctaText: $form.find('.tocart').text()
    }
}
