import {parseTextLink} from '../../../utils/parser-utils'

export const parseNewsLetter = ($content) => {
    const $form = $content.find('footer .form.subscribe')
    const method = $form.attr('method').toLowerCase()
    const action = $form.attr('action')
    return {action, method}
}

export const parseNavigation = ($, $content) => {
    const $links = $content.find('footer .footer.links li a')
    return [].map.call($links, (link) => parseTextLink($(link)))
}
