import React, {PropTypes} from 'react'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const ProductTile = ({className, product}) => {
    const image = product.image
    const startAction = <Image alt={image && image.alt} height="160px" src={image && image.src} width="128px" />

    return (
        <ListTile
            className={className}
            href={product.href}
            startAction={startAction}
        >
            <div className="c-grid__item-name">
                {product.name ? product.name : <SkeletonBlock />}
            </div>

            <div className="c-grid__item-price">
                {product.price ? product.price : <SkeletonBlock />}
            </div>
        </ListTile>
    )
}

ProductTile.propTypes = {
    /**
     * Optional className for the product tile
     */
    className: PropTypes.string,
    /**
     * Product object representing a product on the product list page
     */
    product: PropTypes.shape({
        href: PropTypes.string,
        image: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
        }),
        name: PropTypes.string,
        price: PropTypes.string,
    })
}

export default ProductTile
