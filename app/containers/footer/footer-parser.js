const footerParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'footer Page',
        body
    }
}

export default footerParser
