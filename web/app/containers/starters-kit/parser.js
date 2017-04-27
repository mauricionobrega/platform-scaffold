import {getTextFrom} from '../../utils/parser-utils'

export const startersKitParser = ($, $html) => {
    return {
        title: getTextFrom($html, '.page-title'),
        description: getTextFrom($html, '#text')
    }
}
