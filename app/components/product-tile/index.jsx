import React, {PropTypes} from 'react'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const ProductTile = ({className, product}) => {
    // alt is in product.image props
    /* eslint-disable jsx-a11y/img-has-alt */
    const startAction = <Image {...product.image} height="160px" width="128px" />
    /* eslint-enable jsx-a11y/img-has-alt */

    return (

        <ListTile
            {...product.link}
            className={className}
            startAction={startAction}
        >
            <div className="c-grid__item-name">
                {product.link ? product.link.text : <SkeletonBlock height="34px" />}
            </div>

            <div className="c-grid__item-price">
                {product.price ? product.price : <SkeletonBlock height="22px" width="50px" />}
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
    })
}

export default ProductTile
