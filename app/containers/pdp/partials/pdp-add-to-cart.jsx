import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const PDPAddToCart = ({ formInfo, quantity, setQuantity, onSubmit }) => {
    const hiddenInputNodes = []
    Object.keys(formInfo.hiddenInputs).forEach((input) => {
        hiddenInputNodes.push(<input type="hidden" name={input} value={formInfo.hiddenInputs[input]} key={input} />)
    })
    return (
        <form method={formInfo.method} action={formInfo.submitUrl}>
            {hiddenInputNodes}
            <div className="t-pdp__stepper">
                <label>Quantity</label>
                <Stepper decrementIcon="minus" incrementIcon="plus" initialValue={1} minimumValue={1} onChange={setQuantity}/>
            </div>
            <div className="t-pdp__indicator u-border">In stock</div>
            <Button type="submit" icon="plus" title="Add to cart" showIconText={true} className="c--primary u-width-full u-text-uppercase"/>
        </form>
    )
}

PDPAddToCart.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
    // setQuantity: PropTypes.number.isRequired
}

export default PDPAddToCart
