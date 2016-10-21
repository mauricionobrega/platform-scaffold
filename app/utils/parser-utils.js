export const parseLink = ($link) => {
    return {
        href: $link.attr('href'),
        text: $link.text(),
        title: $link.attr('title')
    }
}

export const parseButton = ($button) => {
    return {
        text: $button.text(),
        type: $button.attr('type'),
        name: $button.attr('name'),
        value: $button.attr('value'),
        disabled: !!$button.attr('disabled')
    }
}

export const parseImage = ($img) => {
    return {
        title: $img.attr('title'),
        alt: $img.attr('alt'),
        src: $img.attr('x-src') ? $img.attr('x-src') : $img.attr('src')
    }
}

export const parseOption = ($option) => {
    const value = $option.attr('value')
    return {
        key: value,
        value,
        selected: !!$option.attr('selected'),
        text: $option.text()
    }
}

export const parseSelect = ($, $select) => {
    return {
        name: $select.attr('name'),
        options: $.makeArray($select.children()).map((item) => parseOption($(item)))
    }
}
