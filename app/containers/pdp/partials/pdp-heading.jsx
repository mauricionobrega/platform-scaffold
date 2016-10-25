import React, {PropTypes} from 'react'

const PDPHeading = ({title, price}) => (
    <div className="c-pdp-heading u-margin-start-md u-margin-end-md">
        <h1 className="c-pdp-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        <span className="c-pdp-heading__price u-text-accent u-text-medium u-text-normal u-text-header-font">{price}</span>
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

export default PDPHeading
