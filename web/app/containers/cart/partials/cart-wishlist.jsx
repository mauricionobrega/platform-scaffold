import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {CART_WISHLIST_MODAL} from '../constants'
import {closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'

const CartWishlistComplete = ({closeModal}) => (
    <div>
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
)

CartWishlistComplete.propTypes = {
    closeModal: PropTypes.func
}

const CartWishlistModal = ({closeModal, isOpen, isComplete}) => {
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
                {isComplete ? <CartWishlistComplete closeModal={closeModal} /> : <InlineLoader />}
            </div>
        </Sheet>
    )
}

CartWishlistModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: PropTypes.func,

    isComplete: PropTypes.bool,

    /**
     * Whether the modal is open or not
     */
    isOpen: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    isOpen: isModalOpen(CART_WISHLIST_MODAL),
    isComplete: () => false
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_WISHLIST_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWishlistModal)
