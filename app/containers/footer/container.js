import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import * as ReduxForm from 'redux-form'
import Field from 'progressive-web-sdk/dist/components/field'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Button from 'progressive-web-sdk/dist/components/button'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'


const NewsletterForm = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit} noValidate>
            <ReduxForm.Field component={Field} name="email">
                <input type="email" placeholder="Enter your email..." noValidate />
            </ReduxForm.Field>
            <Button type="submit" disabled={submitting}>SUBMIT</Button>
        </form>
    )
}

const validate = (values) => {
    const errors = {}
    if(values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const NewsletterReduxForm = ReduxForm.reduxForm({
    form: 'newsletterForm',
    validate,
})(NewsletterForm);


const Footer = (props) => {
    const {footer, dispatch} = props
    const navigation = footer.get('navigation')
    const newsletter = footer.get('newsletter')

    const skeleton = <SkeletonText lines={8} width="100%" style={{lineHeight: '2em'}} />

    const onSubmit = (data) => {
        const method = newsletter.get('method', '')
        const action = newsletter.get('action', '')
        dispatch(actions.signUpToNewsletter(action, method, data))
    }

    return (
        <footer className="t-footer">

            <div className="t-footer__panel t-footer__panel--newsletter">
                {newsletter ? (
                    <div>
                        <span className="t-footer__newsletter-title">Subscribe to Merlin's<br/> Newsletter</span>
                        <div>
                            <NewsletterReduxForm onSubmit={onSubmit} />
                        </div>
                    </div>
                ) : skeleton}
            </div>

            <div className="t-footer__panel t-footer__panel--social">
                <a href="#" className="t-footer__social-link" style={{backgroundImage: 'url(' + getAssetUrl("static/img/facebook.svg") + ')'}}>
                    <span className="u-visually-hidden">Facebook</span>
                </a>
                <a href="#" className="t-footer__social-link" style={{backgroundImage: 'url(' + getAssetUrl("static/img/googleplus.svg") + ')'}}>
                    <span className="u-visually-hidden">Google+</span>
                </a>
                <a href="#" className="t-footer__social-link" style={{backgroundImage: 'url(' + getAssetUrl("static/img/twitter.svg") + ')'}}>
                    <span className="u-visually-hidden">Twitter</span>
                </a>
                <a href="#" className="t-footer__social-link" style={{backgroundImage: 'url(' + getAssetUrl("static/img/twitter.svg") + ')'}}>
                    <span className="u-visually-hidden">Youtube</span>
                </a>
            </div>

            <div className="t-footer__panel t-footer__panel--navigation">
                {navigation ? (
                    <ul className="t-footer__nav">
                        {navigation.map((navItem, idx)=>{
                            return (
                                <li key={idx}>
                                    <a className="t-footer__nav-item-link" href={navItem.get('url')}>{navItem.get('title')}</a>
                                </li>
                            )
                        })}
                    </ul>
                ) : skeleton}

                <p className="t-footer__copyright">
                    Copyright Merlin's Potions 2016<br/>
                    All rights reserved.
                </p>
            </div>

        </footer>
    )
}


export const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}


export default connect(
    mapStateToProps,
)(Footer)
