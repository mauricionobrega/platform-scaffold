const parseBreadcrumbs = ($breadcrumbsLinks) => {
    return $breadcrumbsLinks.get()
        .map((breadcrumbLink) => {
            return {
                href: $(breadcrumbLink).attr('href'),
                text: $(breadcrumbLink).text()
                .trim()
            }
        })
}

const pdpParser = ($, $html) => {
    const $breadcrumbsContainer = $html.find('.breadcrumbs')
    const $breadcrumbs = $breadcrumbsContainer
        .find('li')
        .not(':last-child')
        .find('a')
    const $mainContent = $html.find('.page-main')
    const $form = $mainContent.find('#product_addtocart_form')

    const hiddenInputs = {}
    $form.find('input[type="hidden"]').each((idx, input) => {
        const $input = $(input)
        hiddenInputs[$input.attr('name')] = $input.val()
    })

    return {
        breadcrumbs: parseBreadcrumbs($breadcrumbs),
        contentsLoaded: true,
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        }
    }
}

export default pdpParser
