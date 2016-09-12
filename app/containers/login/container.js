import React from 'react'

import Immutable from 'immutable'

import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'
import styles from './login.scss'

import LoginForm from '../../components/login-form'

import * as loginActions from './actions'

const loginUrl = 'http://www.merlinspotions.com/customer/account/loginPost/'

export class Login extends React.Component {

    constructor(props) {
        super(props)

        this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this)
    }

    componentDidMount() {
        this.props.fetchLoginContents()
    }

    onSubmitLoginForm(formData) {
        const postBody = ''
            .concat(`form_key=${formData.form_key}`)
            .concat('&')
            .concat(`login[username]=${encodeURIComponent(formData.login.username)}`)
            .concat('&')
            .concat(`login[password]=${encodeURIComponent(formData.login.password)}`)
            .concat('&')
            .concat(`persistent_remember_me=${formData.persistent_remember_me}`)

        // Returning a promise from onSubmit helps Redux-Form determine when
        // the form is finished submitting
        return fetch(loginUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `${document.cookie}; form_key=${formData.form_key}`,
            },
            body: postBody
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = response.url
            }
        })
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.immutable, nextProps.immutable)
    }

    render() {
        return (
            <div>
                <Link href="/">Go Home</Link>
                <LoginForm
                    formFields={this.props.loginForm.fields}
                    onSubmit={this.onSubmitLoginForm} />
            </div>
        )
    }
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS(),
        immutable: state.login
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchLoginContents: () => dispatch(loginActions.fetchLoginContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
