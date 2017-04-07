const productDeetsParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const $form = $mainContent.find('#product_addtocart_form')
    return {
        ctaText: $form.find('.tocart').text()
    }
}

export default productDeetsParser
