import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {invertSelector} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const PDPAddToCart = ({quantity, setQuantity, onSubmit, disabled}) => {
    const stepperProps = {
        decrementIcon: 'minus',
        incrementIcon: 'plus',
        initialValue: quantity,
        minimumValue: 1,
        onChange: setQuantity,
    }

    if (disabled) {
        stepperProps.initialValue = 0
        stepperProps.minimumValue = 0
        stepperProps.maximumValue = 0
    }

    return (
        <form className="u-padding-start-md u-padding-end-md">
            <div className="u-margin-top-lg">
                <label htmlFor="quantity">Quantity</label>

                <div className="u-flexbox u-margin-bottom-lg u-margin-top">
                    <Stepper {...stepperProps} />

                    <div className="t-pdp__indicator u-border u-margin-start u-padding-md u-flexbox u-justify-center">
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

const mapStateToProps = createStructuredSelector({
    quantity: selectors.getItemQuantity,
    disabled: invertSelector(selectors.getPdpContentsLoaded)
})

const mapDispatchToProps = {
    setQuantity: actions.setItemQuantity,
    onSubmit: actions.submitCartForm
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDPAddToCart)
