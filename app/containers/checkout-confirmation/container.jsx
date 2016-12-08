import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import * as checkoutConfirmationActions from './actions'

const containerClass = 't-checkout-confirmation'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutConfirmation, newProps.checkoutConfirmation)
    }

    render() {
        const {
            contentsLoaded,
            testText
        } = this.props.checkoutConfirmation.toJS()

        return (
            contentsLoaded &&
                <div className={containerClass}>
                    {testText}
                </div>
        )
    }
}

CheckoutConfirmation.propTypes = {
    checkoutConfirmation: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutConfirmation: state.checkoutConfirmation
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutConfirmationActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutConfirmation)
