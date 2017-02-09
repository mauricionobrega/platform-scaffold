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
    /**
    * The cost of the shipping method
    */
    cost: PropTypes.string,
    /**
    * The label for the shipping method
    */
    label: PropTypes.string
}


export default ShippingMethodLabel
