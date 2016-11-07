import React, {PropTypes} from 'react'

const PDPHeading = ({title, price}) => (
    <div className="c-pdp-heading">
        <h1 className="c-pdp-heading__title">{title}</h1>
        <p className="c-pdp-heading__price">{price}</p>
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

export default PDPHeading
