/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

import RegisterForm from './register-form'
import {PanelDescription} from './common'

const RegisterPanel = ({description, submitForm}) => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg">
            <PanelDescription description={description} />
        </div>

        <div className="u-padding-start-md u-padding-end-md u-padding-bottom-lg">
            <RegisterForm submitForm={submitForm} />
        </div>
    </div>
)

RegisterPanel.propTypes = {
    description: PropTypes.string,
    submitForm: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    description: selectors.register.getDescription,
})

const mapDispatchToProps = {
    submitForm: actions.submitRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPanel)
