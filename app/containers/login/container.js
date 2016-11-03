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
        <div className="t-login">

            <h1 className="u-text-uppercase u-text-normal u-padding-md u-bg-color-neutral-20">{title}</h1>
            <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">{heading}</h3>
                <p>{description}</p>
            </div>
            <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                <LoginForm {...form} submitForm={submitForm} />
            </div>
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
