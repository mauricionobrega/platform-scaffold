const path = require('path')
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

test('the title is parsed', () => {
    const home = homeParser($, jquerifyHtmlFile(path.join(__dirname, 'home.test.html')))
    expect(home).toBeTruthy()
    expect(home.title).toBeTruthy()
    expect(home.title).toBe('Home page')
})
