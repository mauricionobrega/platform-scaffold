import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const PDPAddToCart = ({quantity, setQuantity, onSubmit, disabled}) => {
    const stepperProps = {
        decrementIcon: 'minus',
        disabled,
        incrementIcon: 'plus',
        initialValue: quantity,
        minimumValue: 1,
        onChange: setQuantity,
    }

    return (
        <form className="u-padding-start-md u-padding-end-md">
            <div className="u-margin-top-lg">
                <label htmlFor="quantity">Quantity</label>

                <div className="u-flexbox u-margin-bottom-lg u-margin-top">
                    <Stepper {...stepperProps} />

                    <div className="t-pdp__indicator u-border u-margin-start u-padding-md u-flexbox u-justify-center u-width-full">
                        <Icon name="check" className="u-margin-end-sm" /> In stock
                    </div>
                </div>
            </div>

            <Button
                type="button"
                icon="plus"
                title="Add to cart"
                showIconText={true}
                className="c--primary u-width-full u-text-uppercase u-margin-bottom-lg t-pdp__add-to-cart"
                onClick={onSubmit}
                disabled={disabled}
            />
        </form>
    )
}


PDPAddToCart.propTypes = {
    quantity: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default PDPAddToCart
