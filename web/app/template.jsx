import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {onRouteChanged, fetchPage, removeAllNotifications} from './containers/app/actions'

import {trigger as astroTrigger} from './utils/astro-integration'

import {getURL, getPath} from './utils/utils'

import {requestIdleCallback} from './utils/utils'

// These Unwrapped containers are loadable components. They'll only be
// downloaded when we call upon them
import * as loadableContainers from './containers/templates'

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange({dispatch, location, route}) {
            const url = getURL(location)

            dispatch(onRouteChanged(url, route.routeName))

            if (!route.suppressFetch) {
                dispatch(fetchPage(url, WrappedComponent, route.routeName, route.fetchUrl))
            }
            dispatch(removeAllNotifications())
        }

        componentWillMount() {
            this.dispatchRouteChange(this.props)
        }

        componentDidMount() {
            astroTrigger('pwa-navigated', {
                url: getURL(this.props.location),
                source: 'componentDidMount'
            })

            // Lazy load other containers when browser is at the end of frame
            // to prevent jank
            for (const container in loadableContainers) {
                /* istanbul ignore else */
                if (loadableContainers.hasOwnProperty(container)) {
                    if (container.match(/^unwrapped/i)) {
                        requestIdleCallback(() => {
                            loadableContainers[container].preload()
                        })
                    }
                }
            }
        }

        componentWillReceiveProps(nextProps) {
            if (getPath(this.props.location) !== getPath(nextProps.location)) {
                console.log('changing', Template.displayName)
                this.dispatchRouteChange(nextProps)
                this.props.dispatch(removeAllNotifications())
            }
        }

        componentDidUpdate() {
            astroTrigger('pwa-navigated', {
                url: getURL(this.props.location),
                source: 'componentDidUpdate'
            })
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
    Template.WrappedComponent = WrappedComponent
    Template.displayName = `Template(${getDisplayName(WrappedComponent)})`
    Template.propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object
    }

    return connect()(Template)
}

export default template
