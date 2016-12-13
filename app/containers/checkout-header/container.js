import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import {HeaderBar, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class CheckoutHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.header, nextProps.header)
    }

    render() {
        const {header} = this.props

        return (
            <header className="t-checkout-header">
                <HeaderBar className="t-checkout-header__bar">
                    <HeaderBarTitle className="u-flex u-text-align-start">
                        <h2 className="t-checkout-header__title u-heading-family u-text-uppercase">
                            <span className="u-text-lighter">MERLIN'S</span> CHECKOUT
                        </h2>
                    </HeaderBarTitle>
                </HeaderBar>
            </header>
        )
    }
}

CheckoutHeader.propTypes = {
    header: PropTypes.object,
    isCollapsed: PropTypes.bool,
    toggleHeader: PropTypes.func,
    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func,
}

const mapStateToProps = ({header}) => {
    return {
        header
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutHeader)
