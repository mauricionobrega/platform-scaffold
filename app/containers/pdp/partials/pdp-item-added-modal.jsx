import React, {PropTypes} from 'react'
import Link from 'progressive-web-sdk/dist/components/link'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss, quantity, product: {title, price, carouselItems}}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom">
        <div className="c-sheet__heading">
            <h1>Product Added to Cart</h1>
            <button type="button" onClick={onDismiss}>
                close
            </button>
        </div>
        <div className="c-sheet__content">
            <img role="presentation" src={carouselItems[0].img} />
            <div className="c-sheet__details">
                <p>category</p>
                <h1>{title}</h1>
                <h1>{price}</h1>
                <p>{quantity}</p>
                <Link href="/checkout/cart"><button type="button">go to checkout</button></Link>
                <button type="button" onClick={onDismiss}>continue shopping</button>
            </div>
        </div>
    </Sheet>
)

PDPItemAddedModal.propTypes = {
    open: PropTypes.bool,
    product: PropTypes.object,
    quantity: PropTypes.number,
    onDismiss: PropTypes.func
}

export default PDPItemAddedModal
