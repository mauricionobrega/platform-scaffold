import React, {PropTypes} from 'react'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const PDPHeading = ({title, price}) => (
    <div className="u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {title ? <h1 className="u-text-uppercase u-margin-bottom">{title}</h1>
        : <SkeletonBlock width="50%" height="28px" className="u-margin-bottom" />}
        {price ? <span className="u-text-accent u-text-medium u-text-normal u-text-header-font">{price}</span>
        : <SkeletonBlock width="25%" height="24px" />}
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

export default PDPHeading
