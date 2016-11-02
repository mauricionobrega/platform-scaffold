import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import LoginForm from './partials/form'

import * as actions from './actions'

const Login = ({
    title,
    heading,
    description,
    form,
    submitForm
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <h3>{heading}</h3>
            <p>{description}</p>
            <LoginForm {...form} submitForm={submitForm} />
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (values, resolve, reject) => dispatch(actions.submitForm(values, resolve, reject))
    }
}

Login.propTypes = {
    description: PropTypes.string,
    form: PropTypes.object,
    heading: PropTypes.string,
    href: PropTypes.string,
    submitForm: PropTypes.func,
    title: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
