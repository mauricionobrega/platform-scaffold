const homeParser = ($, $html) => {
    return {
        title: $html.find('title').text()
    }
}

export default homeParser
