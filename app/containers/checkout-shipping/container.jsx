import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import Link from 'progressive-web-sdk/dist/components/link'

import * as checkoutShippingActions from './actions'
import CheckoutShippingReduxForm from './partials/checkout-shipping-form'


class CheckoutShipping extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutShipping, newProps.checkoutShipping)
    }

    render() {
        const {
            contentsLoaded,
        } = this.props.checkoutShipping.toJS()

        return contentsLoaded && (
            <div className="t-checkout-shipping u-bg-color-neutral-20">
                <CheckoutShippingReduxForm />
            </div>
        )
    }
}

CheckoutShipping.propTypes = {
    checkoutShipping: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutShipping: state.checkoutShipping
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutShippingActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShipping)
