const homeParser = ($html) => {
    return {
        test: 'sup',
        title: $html.find('title').text()
    }
}

export default homeParser
