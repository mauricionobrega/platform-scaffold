import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'

/**
 * Product Item represents a single product and it's basic information: name,
 * price, category and other desired information.
 */

const ProductItem = ({
    alt,
    category,
    children,
    className,
    price,
    src,
    title,
}) => {
    const classes = classNames(
        'c-product-item',
        'u-padding-top-md',
        'u-flexbox',
        'u-row-reverse',
        className,
        {
            'u-padding-bottom-md': className.indexOf('padding-bottom') !== -1
        }
    )

    return (
        <article className={classes}>
            <div className="u-flex">
                {!!category &&
                    <p className="c-product-item__category u-margin-bottom-sm u-color-brand">
                        {category}
                    </p>
                }

                <div className="u-margin-bottom-sm">
                    {title}
                </div>

                {!!price &&
                    <p>{price}</p>
                }

                {!!children &&
                    <div>
                        {children}
                    </div>
                }
            </div>
            <div className="u-flex-shrink">
                <Image src={src} alt={alt} />
            </div>
        </article>
    )
}


ProductItem.propTypes = {
    /**
     * Designates the ProductItem's unit price
     */
    price: PropTypes.string.isRequired,

    /**
     * The ProductItem's name or designation
     */
    title: PropTypes.node.isRequired,

    /**
     * Adds an alt argument to the ProductItem's image
     */
    alt: PropTypes.string,

    /**
     * Designates the ProductItem's category (i.e. Potions, Books, etc.)
     */
    category: PropTypes.string,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Provides the source for the ProductItem's image
     */
    src: PropTypes.string,



}

export default ProductItem
