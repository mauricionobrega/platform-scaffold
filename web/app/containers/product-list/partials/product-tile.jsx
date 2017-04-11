import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import ProductItem from '../../../components/product-item'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const titleClassName = classNames(
    't-product-list__product-name',
    'u-h1',
    'u-heading-family',
    'u-color-neutral-60'
)

const ProductImage = ({src, alt}) => (
    <Image
        src={src}
        alt={alt}
        height="150px"
        width="120px"
        />
)

ProductImage.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

const ProductTile = ({className, thumbnail, href, price, title}) => {
    const productImage = (<ProductImage {...thumbnail} />)

    const titleElement = title
        ? <h2 className={titleClassName}>{title}</h2>
        : <SkeletonBlock height="34px" />
    const priceElement = price
        ? <span className="u-text-semi-bold u-color-error">{price}</span>
        : <SkeletonBlock height="22px" width="50px" />

    return (
        <ListTile className="t-product-list__product-tile u-card" href={href}>
            <ProductItem customWidth="45%"
                className={classNames('u-align-center', className)}
                title={titleElement}
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
    href: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    title: PropTypes.string
}

export default ProductTile
