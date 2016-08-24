import React from 'react'

import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'
import styles from './login.scss'

import * as loginActions from './actions'

export const Login = () => {
    return (
        <div>
            <Link href="/">Go Home</Link>
        </div>
    )
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.login,
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchLoginContents: () => dispatch(loginActions.fetchContents()),
        onMyEvent: () => dispatch(loginActions.myAction(true))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
