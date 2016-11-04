import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import ProductItem from '../../../components/product-item'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const titleClassName = classNames(
    't-plp__product-name',
    'u-h1',
    'u-heading-family',
    'u-color-neutral-60'
)

const ProductTile = ({className, product = {}}) => {
    // alt is in product.image props
    /* eslint-disable jsx-a11y/img-has-alt */
    // const startAction = <Image {...product.image} height="160px" width="128px" />
    /* eslint-enable jsx-a11y/img-has-alt */

    const title = product.link
        ? <h2 className={titleClassName}>{product.link.text}</h2>
        : <SkeletonBlock height="34px" />
    const price = product.price
        ? <span className="u-text-semi-bold u-color-error">{product.price}</span>
        : <SkeletonBlock height="22px" width="50px" />

    return (
        <ListTile className="t-plp__product-tile u-card" {...product.link}>
            <ProductItem
                {...product.image}
                className={classNames('u-align-center', className)}
                title={title}
                price={price}
                imageWidth="120px"
                imageHeight="150px" />
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
        }),
        price: PropTypes.string,
    }).isRequired,
    /**
     * Optional className for the product tile
     */
    className: PropTypes.string
}

export default ProductTile
