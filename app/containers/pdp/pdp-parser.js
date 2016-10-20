import Immutable from 'immutable'

const parseCarouselItems = ($, $carouselItems) => {
    return $carouselItems.each((idx, item) => {
        console.log(item)
    })
}

const extractMagentoJson = ($html) => {
    return $html
        .find('script[x-type="text/x-magento-init"]')
        .map((_, item) => item.innerHTML)
        .get()
        .map(JSON.parse)
        .map((item) => Immutable.fromJS(item))
        .reduce((summary, item) => summary.mergeDeep(item), Immutable.Map())
}

const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')

    console.log(extractMagentoJson($html).toJS())

    return {
        product: {
            title: $mainContent.find('.page-title-wrapper.product .page-title > span').text(),
            price: $mainContent.find('.page-info-price .price-wrapper .price').text(),
            carouselItems: parseCarouselItems($, $mainContent.find('.product.media .fotorama__stage__shaft .fotorama__stage__frame')),
            description: $mainContent.find('.product.info.detailed .product.attibute.description p').text(),
        }
    }
}

export default pdpParser
