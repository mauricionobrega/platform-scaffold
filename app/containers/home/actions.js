import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import loadScripts from 'progressive-web-sdk/dist/load-scripts'

import homeParser from './parsers/home'

export const receiveHomeContents = createAction('Received Home Contents')

export const fetchHomeContents = () => {
    return (dispatch) => {
        const url = '/'

        fetch(url)
            .then((response) => jqueryResponse(response))
            .then(([$, $response]) => {
                dispatch(receiveHomeContents(homeParser($, $response)))

                // For any "desktop" script assets which need to be added to the
                // React application, use loadScripts to search for, inject, and
                // execute in original desktop order
                loadScripts
                    // initialize loadScripts with the current selector library
                    // This only needs to be done once in the application
                    .init($)
                    /**
                     * url: current url you want to extract scripts from
                     * $response: jQuery response document
                     * {searchTypes}: string or RegExp search terms
                     *   `contains` - inline scripts
                     *   `src` - external scripts
                     */
                    .inject(url, $response, {
                        contains: [
                            'UA-76264428',
                            'var require',
                        ],
                        src: [
                            'requirejs/require.js',
                        ]
                    })
            })
    }
}
