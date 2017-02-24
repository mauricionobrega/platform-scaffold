import {getTextFrom} from '../../../utils/parser-utils'

export const startersKitParser = ($, $html) => {
    return {
        description: getTextFrom($html, '#text')
    }
}
