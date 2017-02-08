import React, {PropTypes} from 'react'

// SDK Components
import Image from 'progressive-web-sdk/dist/components/image'

// Local Component
import ProductItem from '../../../components/product-item'

const PaymentProductItem = ({item}) => {
    const productImage = (
        <Image
            src={item.product_image.src}
            alt={item.product_image.alt}
            width="104px"
            height="104px"
        />
    )

    return (
        <ProductItem
            className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
            title={<h2 className="u-h3">{item.product_name}</h2>}
            image={productImage}
        >
            <div className="u-flexbox u-align-bottom">
                <div className="u-flex-none u-color-neutral-50">
                    {item.options.map(({label, value}, idx) => (
                        <p
                            className={idx > 0 ? 'u-margin-top-sm' : ''}
                            key={`${item.item_id}-option-${idx}`}
                        >
                            {label}: {value}
                        </p>
                    ))}

                    <p className={item.options > 0 ? 'u-margin-top-sm' : ''}>
                        Qty: {item.qty}
                    </p>
                </div>

                <div className="u-text-align-end u-flex">
                    {item.onSale ?
                        <div>
                            <div className="u-h5 u-color-accent u-text-semi-bold">
                                {item.product_sale_price}
                            </div>

                            <div className="u-text-quiet">
                                <em>Was {item.product_old_price}</em>
                            </div>
                        </div>
                    :
                        <div className="u-h5 u-text-semi-bold">
                            {item.product_price}
                        </div>
                    }
                </div>
            </div>
        </ProductItem>
    )
}


PaymentProductItem.PropTypes = {
    item: PropTypes.object,
}

export default PaymentProductItem
