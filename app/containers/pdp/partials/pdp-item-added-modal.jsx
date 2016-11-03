import React, {PropTypes} from 'react'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss, quantity, product:{title, price, carouselItems}}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom">
        <div className="c-sheet__heading">
            <h1>Product Added to Cart</h1>
            <button type="button" onClick={onDismiss}>
                close
            </button>
        </div>
        <div className="c-sheet__content u-flexbox">
            <img src={carouselItems[0].img} />
            <div className="c-sheet__details">
                <p>category</p>
                <h1>{title}</h1>
                <h1>{price}</h1>
                <p>{quantity}</p>
            </div>
        </div>

        // TODO import button component and pass urls as props
    </Sheet>
)

PDPItemAddedModal.propTypes = {
    open: PropTypes.bool,
    onDismiss: PropTypes.func
}

export default PDPItemAddedModal
