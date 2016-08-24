import test from 'ava'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

test('the title is parsed', (t) => {
    const home = homeParser(window.$, jquerifyHtmlFile('home.test.html'))
    t.truthy(home)
    t.truthy(home.title)
    t.is(home.title, 'Home page')
})
