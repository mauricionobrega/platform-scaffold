import React from 'react'
import {connect} from 'react-redux'
import {onRouteChanged, fetchPage} from './containers/app/actions'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'

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

        dispatchRouteChange(targetProps) {
            const {dispatch, location, route} = targetProps
            triggerMobifyPageView(route.routeName)
            dispatch(onRouteChanged(getURL(location), Template))
            if (!route.suppressFetch) {
                dispatch(fetchPage(getURL(location), Template, route.routeName))
            }
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
