import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import Link from 'progressive-web-sdk/dist/components/link'

import * as checkoutPaymentActions from './actions'

const containerClass = 't-checkout-payment'

class CheckoutPayment extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutPayment, newProps.checkoutPayment)
    }

    render() {
        const {
            contentsLoaded,
            testText
        } = this.props.checkoutPayment.toJS()

        return (
            contentsLoaded &&
                <div className={containerClass}>
                    {testText}
                    <div>
                        <Link href="/checkout/confirmation/" className="u-text-small">To Confirmation</Link>
                    </div>
                </div>
        )
    }
}

CheckoutPayment.propTypes = {
    checkoutPayment: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutPayment: state.checkoutPayment
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutPaymentActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPayment)
