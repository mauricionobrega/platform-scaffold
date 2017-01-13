import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const CheckountConfirmationModal = (props) => {
    const {
        closeModal,
        isOpen,
    } = props

    return (
        <Sheet
            className="t-cart__estimate-shipping-modal"
            open={isOpen}
            onDismiss={closeModal}
            maskOpacity={0.7}
            coverage="90%"
            effect="modal-center"
            shrinkToContent={true}
        >
            <div className="u-padding-md u-text-align-center">
                <div className="u-padding-top-lg u-padding-bottom-lg u-margin-bottom u-text-align-center">
                    <Image src={getAssetUrl('static/img/checkout/account-created.png')} alt="Sparkling user indicating account creation" height="71px" width="104px" />
                </div>

                <p className="u-margin-bottom-lg u-h5">
                    <strong>Account Created Successfully</strong>
                </p>

                <p className="u-margin-bottom-lg">
                    Welcome to the family. You can now track this order in My Account.
                </p>

                <Button className="c--tertiary u-width-full" onClick={closeModal}>
                    Ok
                </Button>
            </div>
        </Sheet>
    )
}

CheckountConfirmationModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,

    countries: React.PropTypes.array,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,

    stateProvinces: React.PropTypes.array
}

export default CheckountConfirmationModal
