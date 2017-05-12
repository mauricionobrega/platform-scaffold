/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import ProductItem from '../product-item'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

/**
 * Product Tile represents a product and it's basic information: image,
 * link and price.
 */

const titleClassName = classNames(
    'c-product-tile__name',
    'u-h4',
    'u-text-font-family',
    'u-text-semi-bold',
    'u-color-neutral-60'
)

const ProductTile = ({className, image, link, price}) => {
    const productImage = (
        <Image
            {...image}
            alt={image && image.alt}
            height="150px"
            width="120px" />
    )

    const title = link
        ? <h2 className={titleClassName}>{link.text}</h2>
        : <SkeletonBlock height="34px" />
    const priceElement = price
        ? <span className="u-text-bold u-color-error">{price}</span>
        : <SkeletonBlock height="22px" width="50px" />

    return (
        <ListTile className="c-product-tile u-card" {...link}>
            <ProductItem customWidth="45%"
                {...image}
                className={classNames('u-align-center', className)}
                title={title}
                price={priceElement}
                image={productImage} />
        </ListTile>
    )
}

ProductTile.propTypes = {
    /**
     * Optional className for the product tile
     */
    className: PropTypes.string,

    /**
     * Product image
     */
    image: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),

    /**
     * Product link
     */
    link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        title: PropTypes.string
    }),

    /**
     * Product price
     */
    price: PropTypes.string,
}

export default ProductTile
