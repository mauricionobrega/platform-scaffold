import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
// import Link from 'progressive-web-sdk/dist/components/link'

import IconLabelButton from '../../components/icon-label-button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import * as miniCartActions from './actions'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class MiniCart extends React.Component {
    // componentDidMount() {
    //     this.props.fetchContents()
    // }

    render() {
        const { miniCart, closeMiniCart } = this.props
        const isOpen = miniCart.get('isOpen')

        // @TODO REPLACE with the Shopping Cart text
        const logoURL = assetUtils.getAssetUrl('static/svg/nav-logo.svg')

        return (
            <Sheet className="t-mini-cart"  open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.85} effect="slide-right">
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <Image className="t-navigation__header-logo" src={logoURL} alt="Merlin's Potions Logo" />
                        <h2 className="u-visually-hidden">Shopping Cart</h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" onClick={closeMiniCart}>Close</IconLabelButton>
                    </HeaderBarActions>
                </HeaderBar>

                <div>
                    Insert Cart HERE
                </div>
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    contentsLoaded: PropTypes.bool,
    closeMiniCart: PropTypes.func,
    fetchContents: PropTypes.func,
}

MiniCart.defaultProps = {
    // contentsLoaded: false,
}

const mapStateToProps = (state) => {
    return {
        miniCart: state.miniCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeMiniCart: () => dispatch(),
    }
}

export default connect(
    mapStateToProps,
    {
        closeMiniCart: miniCartActions.closeMiniCart
    }
)(MiniCart)
