import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import * as actions from './actions'
import * as selectors from './selectors'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitNewsletter = this.onSubmitNewsletter.bind(this)
    }

    onSubmitNewsletter(data) {
        const {method, action} = this.props.footer.newsletter
        this.props.submitNewsletter(method, action, data)
    }

    render() {
        const {footer} = this.props
        const {navigation, newsletter} = footer

        return (
            <footer className="t-footer">
                <FooterNewsletterSubscription newsletter={newsletter} onSubmit={this.onSubmitNewsletter} />
                <FooterSocialIcons social={social} />
                <FooterNavigation navigation={navigation} />
            </footer>
        )
    }
}

Footer.propTypes = {
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object,
    /**
     * Submit the newsletter subscription form to the backend
     */
    submitNewsletter: PropTypes.func
}


const mapStateToProps = createStructuredSelector({
    footer: selectorToJS(selectors.getFooter)
})

const mapDispatchToProps = {
    submitNewsletter: actions.signUpToNewsletter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
