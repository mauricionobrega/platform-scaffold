const parseCarouselItems = ($, $carouselItems) => {
    return $carouselItems.each((item) => {
        console.log(item)
    })
}

const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')

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
