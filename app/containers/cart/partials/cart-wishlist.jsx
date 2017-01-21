import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'

const CartWishlistModal = ({closeModal, isOpen}) => {
    return (
        <Sheet
            className="pw--no-shadow t-cart__wishlist-modal"
            open={isOpen}
            onDismiss={closeModal}
            maskOpacity={0.7}
            effect="modal-center"
            shrinkToContent={true}
            coverage="90%"
        >
            <div className="u-flexbox u-direction-column u-align-center u-padding-md u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                <div className="u-padding-md">
                    <Image
                        src={getAssetUrl('static/img/cart/wishlist@2x.png')}
                        alt="Arrow directed at heart implying wishlist"
                        height="73px"
                        width="104px"
                    />
                </div>

                <p className="u-h5 u-padding-top u-margin-bottom-md">
                    <strong>Item Moved to wishlist</strong>
                </p>

                <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
                    You can find this in the My Account section.
                </p>

                <Button
                    className="c--tertiary u-width-full u-text-uppercase"
                    onClick={closeModal}
                >
                    Ok
                </Button>
            </div>
        </Sheet>
    )
}

CartWishlistModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    isOpen: selectors.getIsWishlistModalOpen
})

const mapDispatchToProps = {
    closeModal: () => actions.toggleWishlistModal(false)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWishlistModal)
