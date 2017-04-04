import {getTextFrom, getTextArrayFrom} from '../../utils/parser-utils'

export const privacyPageParser = ($, $html) => {
    return {
        title: getTextFrom($html, 'h1.page-title'),
        intro: getTextFrom($html, 'div.message.info'),
        cookieList: getTextArrayFrom($, $html, 'th'),
    }
}
