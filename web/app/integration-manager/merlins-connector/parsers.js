import {getCheckoutConfigObject} from '../../utils/magento-utils'

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

export const appParser = ($html) => {
    let isLoggedIn = !!$html.find('.customer-welcome').length
    if (!isLoggedIn) {
        // We may be on a checkout page so check the checkout config object
        const config = getCheckoutConfigObject($html)
        isLoggedIn = (config && config.customerData) ? config.customerData.constructor !== Array : isLoggedIn
    }

    const result = {isLoggedIn}

    const formKeyInput = $html.find('input[name="form_key"]')
    // It looks like the form key is always the same for a given
    // session. So we just grab the first one.
    if (formKeyInput.length) {
        result.formKey = formKeyInput.val()
    }

    return result
}
