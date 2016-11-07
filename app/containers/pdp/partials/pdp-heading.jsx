import React, {PropTypes} from 'react'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const PDPHeading = ({title, price}) => (
    <div className="t-pdp-heading u-padding-md">
        {title ? <h1 className="t-pdp-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        : <SkeletonBlock width="50%" height="28px" className="u-margin-bottom" />}
        {price ? <span className="t-pdp-heading__price u-text-accent u-text-medium u-text-normal u-text-header-font">{price}</span>
        : <SkeletonBlock width="25%" height="24px" />}
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

export default PDPHeading
