import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {onRouteChanged, fetchPage, removeAllNotifications} from './containers/app/actions'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import Astro from './vendor/astro-client'

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const getPath = ({pathname, search}) => pathname + search
const getURL = (routerLocation) =>
      window.location.origin + getPath(routerLocation)

const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange({dispatch, location, route}) {
            const url = getURL(location)

            if (Astro.isRunningInApp() && location.action.toLowerCase() !== 'pop') {
                Astro.trigger('pwa-navigate', {url})
            }

            triggerMobifyPageView(route.routeName)

            dispatch(onRouteChanged(url, WrappedComponent))

            if (!route.suppressFetch) {
                dispatch(fetchPage(url, WrappedComponent, route.routeName))
            }
        }

        componentWillMount() {
            this.dispatchRouteChange(this.props)
        }

        componentWillReceiveProps(nextProps) {
            if (getPath(this.props.location) !== getPath(nextProps.location)) {
                console.log('changing', Template.displayName)
                this.dispatchRouteChange(nextProps)
                this.props.dispatch(removeAllNotifications())
            }
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
