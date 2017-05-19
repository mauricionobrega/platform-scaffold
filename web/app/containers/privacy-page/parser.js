import {getTextFrom} from '../../utils/parser-utils'

const getTextArrayFrom = ($, $element, selector) => {
    const textArray = []
    $element.find(selector).each((index, currentElement) => {
        const $currentElement = $(currentElement) // Don't use $(this)
        textArray.push($currentElement.text())
    })
    return textArray
}

const getFirstTextFrom = ($, $element, selector) => {
    return $element.find(selector).first().text()
}

export const privacyPageParser = ($, $html) => {
    return {
        cookieList: getTextArrayFrom($, $html, 'th'),
        warning: getTextFrom($html, 'div.message.info'),
        para: getFirstTextFrom($, $html, 'p'),
        title: getTextFrom($html, 'h1.page-title'),
    }
}
