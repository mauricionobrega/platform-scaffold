import React from 'react'
import {connect} from 'react-redux'
import {onRouteChanged} from './containers/app/actions'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const getPath = ({pathname, search}) => pathname + search

/**
 * Given the current router state, get the corresponding URL on the
 * desktop site. Ignores #fragments in the router state.
 */
const getURL = (routerLocation) => {
    return [
        window.location.protocol,
        '//',
        window.location.host,
        getPath(routerLocation)
    ].join('')
}


const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange(targetProps) {
            const {dispatch, location, route} = targetProps
            triggerMobifyPageView(route.routeName)
            dispatch(onRouteChanged(getURL(location), Template))
        }

        componentWillMount() {
            console.log('mounting', Template.displayName)

            this.dispatchRouteChange(this.props)
        }

        componentWillUnmount() {
            console.log('unmounting', Template.displayName)
        }

        componentWillReceiveProps(nextProps) {
            if (getPath(this.props.location) !== getPath(nextProps.location)) {
                console.log('changing', Template.displayName)
                this.dispatchRouteChange(nextProps)
            }
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
    Template.displayName = `Template(${getDisplayName(WrappedComponent)})`

    return connect()(Template)
}

export default template
