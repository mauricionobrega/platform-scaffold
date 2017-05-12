import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

import SignInForm from './signin-form'
import {PanelDescription} from './common'

const SignInPanel = (props) => {
    const {
        description,
        submitForm
    } = props
    return (
        <div className="t-login__signin-panel">
            <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg">
                <PanelDescription description={description} />
            </div>

            <div className="u-padding-start-md u-padding-end-md u-padding-bottom-lg">
                <SignInForm submitForm={submitForm} />
            </div>
        </div>
    )
}

SignInPanel.propTypes = {
    description: PropTypes.string,
    submitForm: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    description: selectors.signin.getDescription,
})

const mapDispatchToProps = {
    submitForm: actions.submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel)
