import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
// import * as actions from './actions'

class CheckoutFooter extends React.Component {
//    constructor(props) {
//        super(props)
//    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.footer, nextProps.footer)
    }

    render() {
        const {footer} = this.props

        return (
            <footer className="t-footer" />
        )
    }
}

CheckoutFooter.propTypes = {
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object,
}


const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutFooter)
