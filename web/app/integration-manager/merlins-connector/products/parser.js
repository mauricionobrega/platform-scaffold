import {extractMagentoJson} from '../../../utils/magento-utils'
import {getTextFrom, parseTextLink, parseImage} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const parseCarouselItems = (magentoObject) => {
    const carouselSetup = magentoObject
          .getIn(['[data-gallery-role=gallery-placeholder]', 'mage/gallery/gallery', 'data'])
          .sortBy((item) => item.get('position'))
    return carouselSetup.toJS()
}

export const productListParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const link = parseTextLink($product.find('.product-item-link'))
        const image = parseImage($product.find('.product-image-photo'))
        productMap[urlToPathKey(link.href)] = {
            title: link.text.trim(),
            price: getTextFrom($product, '.price'),
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


const parseBreadcrumbs = ($, $breadcrumbsLinks) => {
    return $breadcrumbsLinks.get()
        .map((breadcrumbLink) => parseTextLink($(breadcrumbLink)))
}

const UENC_REGEX = /\/uenc\/([^/]+),\//

export const productDetailsUIParser = ($, $html) => {
    const $breadcrumbs = (
        $html
            .find('.breadcrumbs')
            .find('li')
            .not(':last-child')
            .find('a')
    )

    const $mainContent = $html.find('.page-main')
    const $form = $mainContent.find('#product_addtocart_form')

    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })

    const submitUrl = $form.attr('action')
    const uencMatch = UENC_REGEX.exec(submitUrl)
    const uenc = uencMatch ? uencMatch[1] : ''

    return {
        breadcrumbs: parseBreadcrumbs($, $breadcrumbs),
        uenc,
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        },
        itemQuantity: parseInt($form.find('#qty').val()),
        ctaText: $form.find('.tocart').text()
    }
}
