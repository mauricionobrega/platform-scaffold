import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import Link from 'progressive-web-sdk/dist/components/link'

import * as checkoutShippingActions from './actions'

const containerClass = 't-checkout-shipping'

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
            testText
        } = this.props.checkoutShipping.toJS()

        return (
            contentsLoaded &&
                <div className={containerClass}>
                    {testText}
                    <div>
                        <Link href="/checkout/payment/" className="u-text-small">To Payment</Link>
                    </div>
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
