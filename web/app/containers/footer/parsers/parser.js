import {parseTextLink} from '../../../utils/parser-utils'

export const parseNewsLetter = ($content) => {
    const $form = $content.find('footer .form.subscribe')
    return {
        action: $form.attr('action'),
        method: $form.attr('method').toLowerCase()
    }
}

const FOOTER_LINK_SELECTOR = 'footer .footer.links li a'

export const parseNavigation = ($, $content) => {
    return [].map.call(
        $content.find(FOOTER_LINK_SELECTOR),
        (link) => parseTextLink($(link))
    )
}
