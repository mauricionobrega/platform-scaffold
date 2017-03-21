import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {selectorToJS} from '../../../utils/selector-utils'

import ProductDetailsVariations from './product-details-variations'
import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const ProductDetailsAddToCart = ({quantity, ctaText, setQuantity, onSubmit, disabled, handleSubmit}) => {
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
        <form className="u-padding-start-md u-padding-end-md" onSubmit={handleSubmit(onSubmit)}>
            <ProductDetailsVariations />

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
                type="submit"
                icon="plus"
                title={ctaText}
                showIconText={true}
                className="c--primary u-width-full u-text-uppercase u-margin-bottom-lg t-product-details__add-to-cart"
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
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    quantity: PropTypes.number
}

const mapStateToProps = createPropsSelector({
    ctaText: selectors.getCTAText,
    quantity: selectors.getItemQuantity,
    disabled: selectors.getAddToCartDisabled,
    initialValues: selectorToJS(selectors.getProductInitialValues)
})

const mapDispatchToProps = {
    setQuantity: actions.setItemQuantity,
    onSubmit: actions.submitCartForm
}

const ProductDetailsAddToCartReduxForm = ReduxForm.reduxForm({
    form: 'product-add-to-cart',
    enableReinitialize: true
})(ProductDetailsAddToCart)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsAddToCartReduxForm)
