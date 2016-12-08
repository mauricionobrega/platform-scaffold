

const parseAddToCartForm = ($, $form) => {
    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })

    return {
        submitUrl: $form.attr('action'),
        method: $form.attr('method'),
        hiddenInputs
    }
}

const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')

    const defaults = {
        isPlaceholder: false,
        contentsLoaded: true,
        itemQuantity: 1,
        itemAddedModalOpen: false,
        quantityAdded: 0
    }

    return {
        formInfo: parseAddToCartForm($, $mainContent.find('#product_addtocart_form')),
        ...defaults
    }
}

export default pdpParser
