/**
 * Code that might be good to move into the AMP-SDK repository...
 */
import React from 'react'

const getDisplayName = (Component) => (
    Component.displayName || Component.name || 'Component'
)

const noop = () => undefined


/**
 * Higher-order component that records the wrapped component's dependency
 * on an external script if it is rendered.
 *
 * This only makes sense for server-side rendering.
 */
export const ampComponent = (WrappedComponent, scriptInclude) => {
    const AmpComponent = (props, context) => {
        const declareDependency = context.declareDependency || noop
        declareDependency(scriptInclude)
        return <WrappedComponent {...props} />
    }
    AmpComponent.displayName = `AmpComponent(${getDisplayName(WrappedComponent)})`

    AmpComponent.contextTypes = {
        declareDependency: React.PropTypes.func
    }

    return AmpComponent
}


/**
 * Wraps the AMP app and shares context, ie. to enable tracking js-dependencies.
 */
export class AmpContext extends React.Component {
    getChildContext() {
        return {declareDependency: this.props.declareDependency}
    }
    render() {
        return this.props.children
    }
}

AmpContext.propTypes = {
    children: React.PropTypes.element,
    declareDependency: React.PropTypes.func
}

AmpContext.childContextTypes = {
    declareDependency: React.PropTypes.func
}


export class Set {
    constructor() {
        this.obj = {}
        this.add = this.add.bind(this)
        this.items = this.items.bind(this)
    }

    add(item) {
        this.obj[item] = true
    }

    items() {
        return Object.keys(this.obj)
    }
}
