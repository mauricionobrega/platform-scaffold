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
            <Stepper incrementIcon="plus" decrementIcon="minus" initialValue={1} minimumValue={1} onChange={setQuantity}/>
            <Button type="submit" text="Add to cart"/>
        </form>
    )
}

PDPAddToCart.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
    // setQuantity: PropTypes.number.isRequired
}

export default PDPAddToCart
