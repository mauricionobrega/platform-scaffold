/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../../utils/parser-utils'

export const parseFields = ($, $fields) => {
    return $fields.map((_, field) => {
        const $tooltip = $(field).find('.tooltip.wrapper')
        return {
            tooltip: $tooltip.length ? {
                title: getTextFrom($tooltip, '.toggle'),
                content: getTextFrom($tooltip, '.content')
            } : false
        }
    })
}

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length
