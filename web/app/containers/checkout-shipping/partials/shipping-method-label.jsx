import React, {PropTypes} from 'react'


const ShippingMethodLabel = ({label, cost}) => {
    return (
        <strong className="u-flexbox u-text-semi-bold">
            <div className="u-flex">{label}</div>
            <div className="u-flex-none">{cost}</div>
        </strong>
    )
}

ShippingMethodLabel.propTypes = {
    cost: PropTypes.string,
    label: PropTypes.string
}


export default ShippingMethodLabel
