import React, {PropTypes} from 'react'
import {connect} from 'react-redux'


const Cart = (props) => null

Cart.propTypes = {
}

Cart.defaultProps = {
}

export const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
