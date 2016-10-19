import React from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Divider from 'progressive-web-sdk/dist/components/divider'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'


const NewsletterForm = (props) => {
    const {handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="email">
                    <input type="email" placeholder="Enter your email..." noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <Button type="submit"
                    className="c--secondary u-width-full u-text-uppercase"
                    disabled={submitting}>
                    Submit
                </Button>
            </FieldRow>
        </form>
    )
}

NewsletterForm.propTypes = {
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const NewsletterReduxForm = ReduxForm.reduxForm({
    form: 'newsletterForm',
    validate,
})(NewsletterForm)


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

    const social = [
        ['http://www.facebook.com/#TODO', 'static/img/facebook.svg', 'Facebook'],
        ['http://www.twitter.com/#TODO', 'static/img/twitter.svg', 'Twitter'],
        ['http://plus.google.com/#TODO', 'static/img/googleplus.svg', 'Google+'],
        ['http://www.youtube.com/#TODO', 'static/img/youtube.svg', 'Youtube'],
    ]

    return (
        <footer className="t-footer">
            <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
                {newsletter ? (
                    <div>
                        <h2 className="u-h3 u-margin-bottom-md">
                            Subscribe to Merlin's Newsletter
                        </h2>

                        <NewsletterReduxForm onSubmit={onSubmit} />
                    </div>
                ) : skeleton}
            </div>

            <div className="t-footer__social u-padding-md">
                <div className="u-flexbox u-justify-center u-padding-md">
                    {
                        social.map((item) => {
                            const [url, icon, title] = item
                            return (
                                <a href={url} className="t-footer__social-link" key={url}
                                    style={{backgroundImage: `url(${getAssetUrl(icon)})`}}>
                                    <span className="u-visually-hidden">{title}</span>
                                </a>
                            )
                        })
                    }
                </div>
            </div>

            <div className="t-footer__navigation u-padding-lg u-text-align-center">
                {navigation ? navigation.map((item, key) =>
                        <ListTile href={item.get('href')} key={key}>
                            {item.get('title')}
                        </ListTile>
                ) :
                    skeleton
                }

                <Divider />

                <div className="t-footer__copyright u-padding-top u-padding-bottom">
                    <p>Copyright Merlin's Potions 2016</p>
                    <p className="u-margin-top">All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: React.PropTypes.func,
    /**
     * Slice into the global app state
     */
    footer: React.PropTypes.object
}


export const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}


export default connect(
    mapStateToProps
)(Footer)
