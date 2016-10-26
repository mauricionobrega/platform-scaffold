import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const social = [
    ['http://www.facebook.com/#TODO', 'static/img/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/img/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/img/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/img/youtube.svg', 'Youtube'],
]

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
