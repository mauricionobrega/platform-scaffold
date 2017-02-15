import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {CART_REMOVE_ITEM_MODAL} from '../constants'
import {removeFromCart} from '../../../store/cart/actions'
import {closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'

const CartRemoveItemModal = ({closeModal, isOpen, itemID, removeFromCart}) => {
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
                        alt=""
                        height="73px"
                        width="104px"
                    />
                </div>

                <p className="u-h5 u-padding-top u-margin-bottom-md">
                    <strong>Remove Item</strong>
                </p>

                <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
                    Are you sure you want to remove this item from your cart?
                </p>

                <div className="u-flex u-flexbox">
                    <Button
                        className="c--tertiary u-text-uppercase"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="c--secondary u-text-uppercase"
                        onClick={() => {
                            closeModal()
                            removeFromCart(itemID)
                        }}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </Sheet>
    )
}

CartRemoveItemModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,
    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
    /**
    * The id of the item being deleted
    */
    itemID: React.PropTypes.string,
    /**
    * Removes the item from the cart
    */
    removeFromCart: React.PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    isOpen: isModalOpen(CART_REMOVE_ITEM_MODAL)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_REMOVE_ITEM_MODAL),
    removeFromCart: (itemId) => removeFromCart(itemId)
}
export default connect(mapStateToProps, mapDispatchToProps)(CartRemoveItemModal)
