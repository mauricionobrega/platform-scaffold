import express from 'express'
import path from 'path'

import React from 'react'
import {renderToString} from 'react-dom/server'

import TestContainer from './app/containers/test-container/container'
import template from './template'
import fs from 'fs'

const app = express()

const router = express.Router()

router.get('*', (req, res) => {
    const PUBLIC_FOLDER = path.join(__dirname, `app/containers/test-container`)

    const appString = renderToString(<TestContainer/>)
    const containerCSS = fs.readFileSync(`${PUBLIC_FOLDER}/container.css`).toString()

    res.send(template({
        body: appString,
        title: 'Hello World from the server',
        includeCSS: containerCSS,
        META: {
            url: 'https://www.mobify/canonical-test'
        }
    }))
})

app.use(router)

export default app
