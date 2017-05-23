/* eslint-env jest */
import AmpHtmlValidator from 'amphtml-validator'

import {homePage, productListPage, productDetailPage} from './main'

describe('Renders valid AMP', () => {

    const resObject = (resolve, reject) => {
        return {
            send: (renderedPage) => {
                return AmpHtmlValidator.getInstance().then((validator) => {
                    const result = validator.validateString(renderedPage)
                    expect(result.status).toEqual('PASS')
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
            }
        }
    }

    test('Home', () => {
        return new Promise((resolve, reject) => {
            const req = {url: '/'}
            const res = resObject(resolve, reject)
            const next = () => {}

            return homePage(req, res, next)
        })
    })

    test('PLP', () => {
        // expect.assertions(0)
        return new Promise((resolve, reject) => {
            const req = {url: '/potions.html'}
            const res = resObject(resolve, reject)
            const next = () => {}

            return productListPage(req, res, next)
        })
    })

    test('PDP', () => {
        // expect.assertions(0)
        return new Promise((resolve, reject) => {
            const req = {url: '/eye-of-newt.html'}
            const res = resObject(resolve, reject)
            const next = () => {}

            return productDetailPage(req, res, next)
        })
    })
})
