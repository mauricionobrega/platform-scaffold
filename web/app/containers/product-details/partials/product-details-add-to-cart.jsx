/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import * as actions from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const ProductDetailsAddToCart = ({quantity, ctaText, setQuantity, onSubmit, disabled}) => {
    const stepperProps = {
        decrementIcon: 'minus',
        disabled,
        incrementIcon: 'plus',
        initialValue: quantity,
        minimumValue: 1,
        onChange: setQuantity,
        className: 'u-flex-none'
    }

    return (
        <form className="u-padding-start-md u-padding-end-md">
            <div className="u-margin-top-lg">
                <label htmlFor="quantity">Quantity</label>

                <div className="u-flexbox u-margin-bottom-lg u-margin-top">
                    {quantity &&
                        <Stepper {...stepperProps} />
                    }

                    <div className="t-product-details__indicator u-border u-margin-start u-padding-md  u-flex u-flexbox u-justify-center">
                        <Icon name="check" className="u-margin-end-sm" /> In stock
                    </div>
                </div>
            </div>

            <Button
                type="button"
                icon="plus"
                title={ctaText}
                showIconText={true}
                className="c--primary u-width-full u-text-uppercase u-margin-bottom-lg t-product-details__add-to-cart"
                onClick={onSubmit}
                disabled={disabled}
            />
        </form>
    )
}

ProductDetailsAddToCart.propTypes = {
    setQuantity: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ctaText: PropTypes.string,
    disabled: PropTypes.bool,
    quantity: PropTypes.number
}

const mapStateToProps = createPropsSelector({
    ctaText: selectors.getCTAText,
    quantity: selectors.getItemQuantity,
    disabled: selectors.getAddToCartDisabled
})

const mapDispatchToProps = {
    setQuantity: actions.setItemQuantity,
    onSubmit: actions.submitCartForm
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsAddToCart)
