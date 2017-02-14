import {parseTextLink} from '../../../utils/parser-utils'

const parseBreadcrumbs = ($, $breadcrumbsLinks) => {
    return $breadcrumbsLinks.get()
        .map((breadcrumbLink) => parseTextLink($(breadcrumbLink)))
}

const pdpParser = ($, $html) => {
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

    return {
        breadcrumbs: parseBreadcrumbs($, $breadcrumbs),
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        }
    }
}

export default pdpParser
