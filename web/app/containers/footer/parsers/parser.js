import {parseTextLink} from '../../../utils/parser-utils'

export const parseNewsLetter = ($content) => {
    const $form = $content.find('footer .form.subscribe')
    const method = $form.attr('method').toLowerCase()
    const action = $form.attr('action')
    return {action, method}
}

const FOOTER_LINK_SELECTOR = 'footer .footer.links li a'

export const parseNavigation = ($, $content) => {
    return [].map.call(
        $content.find(FOOTER_LINK_SELECTOR),
        (link) => parseTextLink($(link))
    )
}
