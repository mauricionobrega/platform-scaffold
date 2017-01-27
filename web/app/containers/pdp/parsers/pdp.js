const pdpParser = ($, $html) => {
    const $mainContent = $html.find('.page-main')
    const $form = $mainContent.find('#product_addtocart_form')

    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })

    return {
        contentsLoaded: true,
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        }
    }
}

export default pdpParser
