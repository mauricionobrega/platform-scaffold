import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const PDPAddToCart = ({ formInfo, quantity, setQuantity, onSubmit }) => {
    const hiddenInputNodes = []
    Object.keys(formInfo.hiddenInputs).forEach((input) => {
        hiddenInputNodes.push(<input type="hidden" name={input} value={formInfo.hiddenInputs[input]} key={input} />)
    })
    return (
        <form method={formInfo.method} action={formInfo.submitUrl} className="u-padding-start-md u-padding-end-md">
            {hiddenInputNodes}
            <div className="t-pdp__stepper u-margin-top-lg">
                <label>Quantity</label>
                <div className="u-flexbox u-margin-bottom-lg u-margin-top">
                    <Stepper decrementIcon="minus" incrementIcon="plus" initialValue={1} minimumValue={1} onChange={setQuantity}/>
                    <div className="t-pdp__indicator u-border">In stock</div>
                </div>
            </div>
            <Button type="submit" icon="plus" title="Add to cart" showIconText={true} className="c--primary u-width-full u-text-uppercase u-margin-bottom-lg"/>
        </form>
    )
}

PDPAddToCart.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
    // setQuantity: PropTypes.number.isRequired
}

export default PDPAddToCart
