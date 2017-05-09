/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parseTextLink} from '../../../utils/parser-utils'

const parseBreadcrumbs = ($, $breadcrumbsLinks) => {
    return $breadcrumbsLinks.get()
        .map((breadcrumbLink) => parseTextLink($(breadcrumbLink)))
}

const UENC_REGEX = /\/uenc\/([^/]+),\//

const productDetailsParser = ($, $html) => {
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

    const submitUrl = $form.attr('action')
    const uencMatch = UENC_REGEX.exec(submitUrl)
    const uenc = uencMatch ? uencMatch[1] : ''

    return {
        breadcrumbs: parseBreadcrumbs($, $breadcrumbs),
        uenc,
        formInfo: {
            submitUrl: $form.attr('action'),
            method: $form.attr('method'),
            hiddenInputs
        },
        itemQuantity: parseInt($form.find('#qty').val()),
        ctaText: $form.find('.tocart').text()
    }
}

export default productDetailsParser
