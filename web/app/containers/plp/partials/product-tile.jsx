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
        ? <span className="u-text-semi-bold u-color-error">{price}</span>
        : <SkeletonBlock height="22px" width="50px" />

    return (
        <ListTile className="t-plp__product-tile u-card" {...link}>
            <ProductItem
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
    image: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        title: PropTypes.string
    }),
    price: PropTypes.string,
}

export default ProductTile
