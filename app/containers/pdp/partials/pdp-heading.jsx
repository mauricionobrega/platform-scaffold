import React, {PropTypes} from 'react'

const PDPHeading = ({title, price}) => (
    <div className="t-pdp-heading u-padding-md">
        <h1 className="u-text-uppercase u-margin-bottom">{title}</h1>
        <span className="u-text-accent u-text-medium u-text-normal u-text-header-font">{price}</span>
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

export default PDPHeading
