import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import loadScripts from 'progressive-web-sdk/dist/load-scripts'

import plpParser from './parsers/plp'

export const receivePlpContents = createAction('Received Plp Contents')

export const fetchPlpContents = () => {
    return (dispatch) => {
        const url = window.location.href

        fetch(url)
            .then((response) => jqueryResponse(response))
            .then(([$, $response]) => {
                dispatch(receivePlpContents(plpParser($, $response)))

                // For any "desktop" script assets which need to be added to the
                // React application, use loadScripts to search for, inject, and
                // execute in original desktop order
                loadScripts
                    // initialize loadScripts with the current selector library
                    // This only needs to be done once in the application
                    .init($)
                    /**
                     * url: the url that the jQuery response is from
                     * $response: jQuery response object from jQueryResponse
                     * {searchTypes}: string or RegExp script search terms
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
                            /mixins\.js/
                        ]
                    })
            })
    }
}
