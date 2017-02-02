/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../utils/parser-utils'

export const parseFields = ($, $fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        const $tooltip = $field.find('.tooltip.wrapper')
        return {
            label: getTextFrom($field, 'label'),
            name: $field.find('input').attr('name'),
            type: $field.find('input').attr('type'),
            required: $field.hasClass('required'),
            tooltip: $tooltip.length ? {
                title: getTextFrom($tooltip, '.toggle'),
                content: getTextFrom($tooltip, '.content')
            } : false
        }
    })
}

export const parseHiddenInputs = ($, $inputs) => {
    return $inputs.map((_, input) => {
        const $input = $(input)
        return {
            name: $input.attr('name'),
            type: 'hidden',
            value: $input.val()
        }
    })
}
