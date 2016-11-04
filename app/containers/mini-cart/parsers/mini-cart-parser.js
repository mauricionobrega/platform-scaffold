const miniCartParser = ($, $html) => {
    const body = $html.find('body').html()

    return {
        testText: 'miniCart Page',
        body
    }
}

export default miniCartParser
