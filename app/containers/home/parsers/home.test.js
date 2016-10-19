import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

test('homepage is parsed', () => {
    const home = homeParser($, jquerifyHtmlFile('app/containers/home/parsers/home.test.html'))
    expect(home).toBeTruthy()
    expect(home.categories).toBeTruthy()
    expect(home.banners).toBeTruthy()
})
