import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'
import SkipLinks from 'progressive-web-sdk/dist/components/skip-links'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import MiniCart from '../../containers/mini-cart/container'
import Navigation from '../../containers/navigation/container'
import * as navActions from '../../containers/navigation/actions'
import * as miniCartActions from '../../containers/mini-cart/actions'
import sprite from '../../static/svg/sprite-dist/sprite.svg'
import * as appActions from './actions'

import {isRunningInAstro} from '../../utils/astro-integration'

import NotificationManager from '../../components/notification-manager'

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
            requestOpenMiniCart,
            openNavigation,
            history,
            children,
            app,
            notificationActions
        } = this.props

        const currentTemplateProps = children.props
        const currentTemplate = `app--${currentTemplateProps.route.routeName}`
        const CurrentHeader = currentTemplateProps.route.Header || Header
        const CurrentFooter = currentTemplateProps.route.Footer || Footer
        const {notifications} = app.toJS()

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
            <div id="app" className="t-app" style={{display: 'none'}}>
                <IconSprite sprite={sprite} />
                <SkipLinks items={skipLinksItems} />

                <div id="app-wrap" className={currentTemplate}>
                    <div id="app-header" role="banner">
                        <CurrentHeader onMenuClick={openNavigation} onMiniCartClick={requestOpenMiniCart} isRunningInAstro={isRunningInAstro} />
                        {notifications &&
                            <NotificationManager notifications={notifications} actions={notificationActions} />
                        }

                        <Navigation history={history} />
                        <MiniCart />
                    </div>

                    <main id="app-main" role="main">
                        {this.props.children}
                    </main>

                    <div id="app-footer">
                        <CurrentFooter isRunningInAstro={isRunningInAstro} />
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
    app: PropTypes.object,
    history: PropTypes.object,
    notificationActions: PropTypes.object,
    openNavigation: PropTypes.func,
    requestOpenMiniCart: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        openNavigation: () => dispatch(navActions.openNavigation()),
        requestOpenMiniCart: () => dispatch(miniCartActions.requestOpenMiniCart()),
        notificationActions: {
            removeNotification: (id) => dispatch(appActions.removeNotification(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
