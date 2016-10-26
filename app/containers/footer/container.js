import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import NewsletterForm from './partials/newsletter-form'

const social = [
    ['http://www.facebook.com/#TODO', 'static/img/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/img/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/img/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/img/youtube.svg', 'Youtube'],
]

const FooterNewsletterSubscription = ({newsletter, onSubmit}) => {
    const skeleton = <SkeletonText lines={8} width="100%" style={{lineHeight: '2em'}} />

    return (
        <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
            {newsletter ? (
                <div>
                    <h2 className="u-h2 u-margin-bottom-md">
                        Subscribe to Merlin's Newsletter
                    </h2>

                    <NewsletterForm onSubmit={onSubmit} />
                </div>
            ) : skeleton}
        </div>
    )
}

FooterNewsletterSubscription.propTypes = {
    newsletter: PropTypes.object,
    onSubmit: PropTypes.func
}

const FooterSocialIcons = ({social}) => {
    return (
        <div className="t-footer__social u-padding-md">
            <div className="u-flexbox u-justify-center u-padding-md">
                {
                    social.map(([url, icon, title]) => {
                        return (
                            <a href={url} className="t-footer__social-link" key={url} style={{backgroundImage: `url(${getAssetUrl(icon)})`}}>
                                <span className="u-visually-hidden">{title}</span>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

FooterSocialIcons.propTypes = {
    social: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation ? navigation.map((item, key) =>
                <ListTile href={item.get('href')} key={key}>
                    {item.get('title')}
                </ListTile>
            ) :
                <SkeletonText lines={8} width="100%" style={{lineHeight: '2em'}} />
            }

            <Divider />

            <div className="t-footer__copyright u-padding-top u-padding-bottom">
                <p>Copyright Merlin's Potions 2016</p>
                <p className="u-margin-top">All rights reserved.</p>
            </div>
        </div>
    )
}

FooterNavigation.propTypes = {
    navigation: PropTypes.object
}

const Footer = (props) => {
    const {footer, dispatch} = props
    const navigation = footer.get('navigation')
    const newsletter = footer.get('newsletter')

    const onSubmit = (data) => {
        const method = newsletter.get('method', '')
        const action = newsletter.get('action', '')
        dispatch(actions.signUpToNewsletter(action, method, data))
    }

    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription newsletter={newsletter} onSubmit={onSubmit} />
            <FooterSocialIcons social={social} />
            <FooterNavigation navigation={navigation} />
        </footer>
    )
}

Footer.propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func,
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object
}


const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

        const mapDispatchToProps = (dispatch) => {

        }


export default connect(
    mapStateToProps
)(Footer)
