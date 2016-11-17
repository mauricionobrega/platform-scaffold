// import React, {PropTypes} from 'react'
import {connect} from 'react-redux'


const Cart = (props) => null

Cart.propTypes = {
}

Cart.defaultProps = {
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
