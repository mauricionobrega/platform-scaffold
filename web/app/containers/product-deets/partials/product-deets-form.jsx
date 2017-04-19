import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Stepper from 'progressive-web-sdk/dist/components/stepper'
import Button from 'progressive-web-sdk/dist/components/button'

const ProductDeetsForm = ({ctaText}) => (
    <div className="t-product-deets__form u-padding-md u-box-shadow u-position-relative u-z-index-1">
        <form>
            <FieldRow>
                <Field label="1. Choose Size:">
                    <select>
                        <option>01 - Small</option>
                        <option>02 - Regular</option>
                        <option>03 - Large</option>
                    </select>
                </Field>
            </FieldRow>
            <FieldRow>
                <Field label="2. Choose Color:">
                    <select>
                        <option>Castlerock $98.00</option>
                        <option>Soft Rock $88.00</option>
                        <option>Hard Rock $108.00</option>
                    </select>
                </Field>
            </FieldRow>
            <FieldRow>
                <Field label="3. Select Quantity:">
                    <Stepper className="u-width-full u-text-align-center" incrementIcon="plus" decrementIcon="minus" initialValue={1} />
                </Field>
            </FieldRow>
            <FieldRow>
                <Button className="c--primary u-width-full">
                    <span>{ctaText}</span>
                </Button>
            </FieldRow>
            <FieldRow>
                <Button className="c--tertiary u-width-full">
                    <span>+Wish List / Registry</span>
                </Button>
            </FieldRow>
        </form>
    </div>
)

ProductDeetsForm.propTypes = {
    ctaText: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    ctaText: selectors.getCTAText
})

export default connect(mapStateToProps)(ProductDeetsForm)
