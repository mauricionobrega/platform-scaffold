const plpParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const $products = $html.find('.item.product-item')
    const products = $.makeArray($products).map((product) => {
        const $product = $(product)
        const $image = $product.find('.product-image-photo')

        return {
            href: $product.find('.product-item-link').attr('href'),
            image: {
                alt: $image.attr('alt'),
                src: $image.attr('x-src')
            },
            name: $product.find('.product-item-name').text(),
            price: $product.find('.price').text()
        }
    })

    return {
        noResultsText: $html.find('.message.empty').text(),
        numItems: $numItems.length > 0 ? $numItems.text() : '0',
        products,
        title: $html.find('.page-title').text(),
    }
}

export default plpParser
