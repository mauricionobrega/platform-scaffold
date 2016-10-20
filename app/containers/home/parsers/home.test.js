import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

describe('homepage', () => {
    let home

    beforeAll(() => {
        home = homeParser($, jquerifyHtmlFile('app/containers/home/parsers/home.test.html'))
    })


    it('is parsed', () => {
        expect(home).toBeTruthy()
        expect(home.categories).toBeTruthy()
        expect(home.banners).toBeTruthy()
    })

    it('contains well-structured categories', () => {
        const category = home.categories[0]
        expect(category.href).toBeTruthy()
        expect(category.text).toBeTruthy()
    })

    it('contains well-structured banners', () => {
        const banner = home.banners[0]
        expect(banner.src).toBeTruthy()
        expect(banner.href).toBeTruthy()
        expect(banner.alt).toBeTruthy()
    })

})
