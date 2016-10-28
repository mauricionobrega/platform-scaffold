import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const productNameClasses = classNames(
    't-plp__grid-item-name',

    'u-color-neutral-60',
    'u-text-lighter',
    'u-text-uppercase',

    'u-padding-top',
    'u-padding-bottom'
)

const ProductTile = ({className, product = {}}) => {
    // alt is in product.image props
    /* eslint-disable jsx-a11y/img-has-alt */
    const startAction = <Image {...product.image} height="160px" width="128px" />
    /* eslint-enable jsx-a11y/img-has-alt */

    return (
        <ListTile
            {...product.link}
            className={classNames(className, 'u-margin-bottom', 'u-padding')}
            startAction={startAction}
        >
            <h1 className={productNameClasses}>
                {product.link ? product.link.text : <SkeletonBlock height="34px" />}
            </h1>

            <div className="t-plp__grid-item-price u-padding-top-lg u-padding-bottom">
                {product.price ? product.price : <SkeletonBlock height="22px" width="50px" />}
            </div>
        </ListTile>
    )
}

ProductTile.propTypes = {
    /**
     * Product object representing a product on the product list page
     */
    product: PropTypes.shape({
        link: PropTypes.shape({
            href: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            title: PropTypes.string
        }),
        image: PropTypes.shape({
            alt: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            title: PropTypes.string
        }),
        price: PropTypes.string,
    }).isRequired,
    /**
     * Optional className for the product tile
     */
    className: PropTypes.string
}

export default ProductTile
