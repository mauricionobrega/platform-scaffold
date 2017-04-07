import React from 'react'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Stepper from 'progressive-web-sdk/dist/components/stepper'
import Button from 'progressive-web-sdk/dist/components/button'

const ProductDeetsForm = () => (
    <div className="t-product-deets-form u-padding-md u-box-shadow u-position-relative u-z-index-1">
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
                    <Stepper incrementIcon="plus" decrementIcon="minus" initialValue={1} />
                </Field>
            </FieldRow>
            <FieldRow>
                <Button className="c--secondary">
                    <span>Add to Cart</span>
                </Button>
            </FieldRow>
            <FieldRow>
                <Button className="c--tertiary">
                    <span>+Wish List / Registry</span>
                </Button>
            </FieldRow>
        </form>
    </div>
)

export default ProductDeetsForm
