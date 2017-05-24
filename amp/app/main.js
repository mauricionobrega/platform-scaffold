import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

import process from 'process'
import path from 'path'
import Promise from 'bluebird'
import fetch from 'node-fetch'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import _jsdom from 'jsdom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import * as awsServerlessExpress from 'aws-serverless-express'

import Home from './containers/home/container'
import PDP from './containers/pdp/container'
import PLP from './containers/plp/container'


import ampPage from './templates/amp-page'
import * as ampSDK from './amp-sdk'

import styles from './stylesheet.scss'

// import global styles from PWA
import globalCSS from './global.scss'


const jsdom = Promise.promisifyAll(_jsdom)


const base = 'https://www.merlinspotions.com'

export const jsdomEnv = () => jsdom.envAsync('', ['http://code.jquery.com/jquery.js'])

export const parse = (window, html) => {
    const $ = window.$
    const $html = $(html)
    return {
        links: $.map($html.find('a'), (el) => $(el).text()),
        title: $html.find('h1').text()
    }
}


/**
 * This could be either an HTML-scraper or an integration manager call.
 */
const initializeStore = (req) => {
    const noopReducer = (state) => state
    return Promise.all([jsdomEnv(), fetch(base + req.url).then((res) => res.text())])
    .then(([window, html]) => parse(window, html))
    .then((initialData) => createStore(noopReducer, initialData))
}


const render = (req, res, store, component) => {
    const scripts = new ampSDK.Set()
    const body = ReactDOMServer.renderToStaticMarkup(
        <Provider store={store}>
            <ampSDK.AmpContext declareDependency={scripts.add}>
                {React.createElement(component, {}, null)}
            </ampSDK.AmpContext>
        </Provider>
    )
    const state = store.getState()
    const rendered = ampPage({
        title: state.title,
        canonicalURL: req.url,
        body,
        globalCSS: globalCSS.toString(),
        css: styles.toString(),
        ampScriptIncludes: scripts.items().join('\n')
    })
    res.send(rendered)
}


export const productDetailPage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, PDP))
        .catch(next)
}

export const productListPage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, PLP))
        .catch(next)
}

export const homePage = (req, res, next) => {
    initializeStore(req)
        .then((store) => render(req, res, store, Home))
        .catch(next)
}

const app = express()

app.get('/', homePage)
app.get('/potions.html', productListPage)
app.get('/books.html', productListPage)
app.get('/ingredients.html', productListPage)
app.get('/supplies.html', productListPage)
app.get('/new-arrivals.html', productListPage)
app.get('/charms.html', productListPage)
app.get('/checkout/cart/configure/id/*/product_id/*/', productDetailPage)
app.get('*.html', productDetailPage)

app.use('/static', express.static(path.resolve('./app/static')))



const onLambda = process.env.hasOwnProperty('AWS_LAMBDA_FUNCTION_NAME')


if (!onLambda) {
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
}


/**
 * Wrap the express app returning a handler function that can be used with AWS Lambda.
 */
const makeHandler = (expressApp) => {
    const binaryMimeTypes = [
      // If we choose to let express output gzipped responses, we'd need to add mimetypes here.
      // 'text/html',
    ]
    const server = awsServerlessExpress.createServer(expressApp, null, binaryMimeTypes)
    return (event, context) => awsServerlessExpress.proxy(server, event, context)
}


export const handler = onLambda ? makeHandler(app) : undefined
