const plpParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const products = $.makeArray($products).map((product) => {
        const $product = $(product)
        const $image = $product.find('.product-image-photo')

        return {
            name: $product.find('.product-item-name').text(),
            href: $product.find('.product-item-link').attr('href'),
            image: {
                src: $image.attr('x-src'),
                alt: $image.attr('alt')
            },
            price: $product.find('.price').text()
        }
    })

    const $numItems = $html.find('#toolbar-amount .toolbar-number')

    return {
        title: $html.find('.page-title').text().trim(),
        numItems: $numItems.length > 0 ? $numItems.text() : '0',
        products: products,
        noResultsText: $html.find('.message.empty').text()
    }
}

export default plpParser
