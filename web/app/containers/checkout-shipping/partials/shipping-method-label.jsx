import React, {PropTypes} from 'react'


const ShippingMethodLabel = ({label, info, cost}) => {
    return (
        <strong className="u-flexbox u-text-semi-bold">
            <div className="u-flex">
                <div>{label}</div>
                <div className="u-text-quiet u-text-normal u-margin-top-sm">{info}</div>
            </div>
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
    * The info for the shipping method
    */
    info: PropTypes.string,
    /**
    * The label for the shipping method
    */
    label: PropTypes.string
}


export default ShippingMethodLabel
