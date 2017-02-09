import React, {PropTypes} from 'react'

// SDK Components
import Image from 'progressive-web-sdk/dist/components/image'

// Local Component
import ProductItem from '../../../components/product-item'

const PaymentProductItem = ({
    item_id,
    product_image,
    product_name,
    product_old_price,
    onSale,
    options,
    product_price,
    qty,
    product_sale_price
}) => {
    const productImage = (
        <Image
            src={product_image.src}
            alt={product_image.alt}
            width="104px"
            height="104px"
        />
    )

    return (
        <ProductItem
            className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
            title={<h2 className="u-h3">{product_name}</h2>}
            image={productImage}
        >
            <div className="u-flexbox u-align-bottom">
                <div className="u-flex-none u-color-neutral-50">
                    {options.map(({label, value}, idx) => (
                        <p
                            className={idx > 0 ? 'u-margin-top-sm' : ''}
                            key={`${item_id}-option-${idx}`}
                        >
                            {label}: {value}
                        </p>
                    ))}

                    <p className={options > 0 ? 'u-margin-top-sm' : ''}>
                        Qty: {qty}
                    </p>
                </div>

                <div className="u-text-align-end u-flex">
                    {onSale ?
                        <div>
                            <div className="u-h5 u-color-accent u-text-semi-bold">
                                {product_sale_price}
                            </div>

                            <div className="u-text-quiet">
                                <em>Was {product_old_price}</em>
                            </div>
                        </div>
                    :
                        <div className="u-h5 u-text-semi-bold">
                            {product_price}
                        </div>
                    }
                </div>
            </div>
        </ProductItem>
    )
}


PaymentProductItem.propTypes = {
    /**
     * Item ID
     */
    item_id: PropTypes.string,

    /**
     * Product options
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),

    /**
     * Image data
     */
    product_image: PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
    }),

    /**
     * Product Name
     */
    product_name: PropTypes.string,

    /**
     * Standard price
     */
    product_price: PropTypes.string,

    /**
     * Old Price
     */
    product_old_price: PropTypes.string,

    /**
     * Sale Price
     */
    product_sale_price: PropTypes.string,

    /**
     * Number of items
     */
    qty: PropTypes.number,

    /**
     * Whether item is on sale or not
     */
    onSale: PropTypes.bool,
}

export default PaymentProductItem
