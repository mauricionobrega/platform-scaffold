import {createAction as createReduxAction} from 'redux-actions'
import fromPairs from 'lodash.frompairs'
import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

// Re-export the SDK utilities for now
export {makeRequest, makeFormEncodedRequest}

// simplify redux-actions createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    return createReduxAction(
        description,
        argNames.length ?
            (...args) => fromPairs(argNames.map((arg, idx) => [arg, args[idx]]))
            : null
    )
}

export const analyticMetaPayloadCreator = (type, payload) => ({
    analytics: {
        type,
        payload
    }
})

/**
 * createActionWithMeta - creates action with meta
 *
 * The parameter after the last payload parameter will always be the meta payload
 *
 * Usage:
 *
 * = Creating the action =
 * export const actionVariable = createActionWithMeta('Action name',
 *      ['parameter1', 'parameter2']                                // The parameter name to map to payload
 *      (parameter1, parameter2, parameter3) => (parameter3)        // The meta payload creator - this tells the action which parameter to use for meta payload
 * )
 *
 *
 * You can also create meta payload from payload as well
 * export const actionVariable = createActionWithMeta('Action name',
 *      ['parameter1', 'parameter2']
 *      (parameter1, parameter2) => ({
 *          analytics: {
 *              type: parameter1,
 *              payload: {
 *                  name: parameter2
 *              }
 *          }
 *      })
 * )
 *
 * = Dispatching the action =
 * dispatch(actionVariable('abc', 'def', {
 *      analytics: {                            // Define meta payload here: It must be in FSA standard
 *          type: 'Pageview',
 *          payload: {
 *              name: 'PLP'
 *          }
 *      }
 * }))
 *
 * = Using convient meta payload creator for analytic =
 * dispatch(actionVariable('abc', 'def', analyticMetaPayloadCreator('Pageview', {
 *      name: 'PLP'
 * })
 *
 * Note: The intention of this function is to replace createAction utilty function defined above
 *
 * @description {string} - a unique name for the action
 * @argNamesPayloadAry {array} - an array of strings that identifies each parameter
 */
export const createActionWithMeta = (description, argNamesPayloadAry, metaCreator) => {
    return createReduxAction(
        description,
        argNamesPayloadAry.length ?
            (...args) => fromPairs(argNamesPayloadAry.map((arg, idx) => [arg, args[idx]]))
            : null,
        metaCreator ? metaCreator : null

    )
}

/**
 * Retrieve the wrapped component if there is one, otherwise just returns the passed-in component
 * @param {object} component - a React component, potentially wrapped with react-redux
 * @returns {object} - The component or the WrappedComponent if it exists
 */
export const getComponentType = (component) => {
    return component.WrappedComponent || component
}

/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) => () => fn()


/**
 * Converts a full URL to the preferred format for keying the redux store,
 * i.e. the path and query string
 */

export const urlToPathKey = (url) => {
    const urlObject = new URL(url)

    return `${urlObject.pathname}${urlObject.search}`
}
