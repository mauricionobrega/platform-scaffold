import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import SkipLinks from 'progressive-web-sdk/dist/components/skip-links'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import MiniCart from '../../containers/mini-cart/container'
import Navigation from '../../containers/navigation/container'
import * as appActions from '../app/actions'
import * as selectors from './selectors'

import NotificationManager from '../../components/notification-manager'

// @TODO: Replace this with an action that fetches the SVG file via Ajax
import sprite from '../../static/svg/sprite-dist/sprite.svg'

const hidePreloaderWhenCSSIsLoaded = () => {
    if (window.Progressive.stylesheetLoaded) {
        hidePreloader()
    } else {
        setTimeout(hidePreloaderWhenCSSIsLoaded, 100)
    }
}


class App extends React.Component {
    componentDidMount() {
        hidePreloaderWhenCSSIsLoaded()

        // Dispatch an action to retrieve global content here
    }

    render() {
        const {
            children,
            history,
            notifications,
            removeNotification
        } = this.props
        const currentTemplateProps = children.props
        const CurrentHeader = currentTemplateProps.route.Header || Header
        const CurrentFooter = currentTemplateProps.route.Footer || Footer

        const skipLinksItems = [
            // Customize your list of SkipLinks here. These are necessary to
            // achieve compliance with WCAG 2.0's guideline 2.4.1: "Bypass
            // Blocks". Compliance is required under some laws, such as the ADA
            // (Americans with Disabilities Act). For more details, see here:
            //
            // @URL: https://www.w3.org/TR/WCAG20-TECHS/G1.html
            {target: '#app-main', label: 'Skip to content'},
            {target: '#header-navigation', label: 'Skip to main navigation'},
            {target: '#app-footer', label: 'Skip to footer'},
        ]

        return (
            <div
                id="app"
                className={`t-app t-app--${currentTemplateProps.route.routeName}`}
                style={{display: 'none'}}
            >
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>
                <SkipLinks items={skipLinksItems} />

                <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                    <div id="app-header" className="u-flex-none" role="banner">
                        <CurrentHeader />

                        {notifications &&
                            <NotificationManager
                                notifications={notifications}
                                actions={{removeNotification}}
                            />
                        }

                        <Navigation history={history} />
                        <MiniCart />
                    </div>

                    <main id="app-main" className="u-flex" role="main">
                        {this.props.children}
                    </main>

                    <div id="app-footer" className="u-flex-none">
                        <CurrentFooter />
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * The react-router history object
     */
    history: PropTypes.object,
    notifications: PropTypes.array,
    removeNotification: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    notifications: selectorToJS(selectors.getNotifications)
})

const mapDispatchToProps = {
    removeNotification: appActions.removeNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
