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
import * as appActions from '../app/actions'

import NotificationManager from '../../components/notification-manager'

// Offline support
import {getComponentType} from '../../utils/utils'
import Offline from '../../components/offline'
import OfflineBanner from '../../components/offline-banner'

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
    }

    render() {
        const {
            app,
            children,
            history,
            notificationActions,
            openNavigation,
            requestOpenMiniCart,
            fetchPage
        } = this.props

        const routeProps = children.props.route
        const CurrentHeader = routeProps.Header || Header
        const CurrentFooter = routeProps.Footer || Footer
        const {notifications, fetchError, currentURL, fetchedUrls} = app.toJS()

        const reload = () => fetchPage(window.location.href, getComponentType(routeProps.component), routeProps.routeName)

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
                className={`t-app t-app--${routeProps.routeName}`}
                style={{display: 'none'}}
            >
                <IconSprite sprite={sprite} />
                <SkipLinks items={skipLinksItems} />

                <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                    <div id="app-header" className="u-flex-none" role="banner">
                        <CurrentHeader
                            onMenuClick={openNavigation}
                            onMiniCartClick={requestOpenMiniCart}
                        />
                        {fetchError && fetchedUrls[currentURL] && <OfflineBanner />}

                        {notifications &&
                            <NotificationManager
                                notifications={notifications}
                                actions={notificationActions}
                            />
                        }

                        <Navigation history={history} />
                        <MiniCart />
                    </div>

                    {(!fetchError || fetchedUrls[currentURL]) ?
                        <div>
                            <main id="app-main" className="u-flex" role="main">
                                {this.props.children}
                            </main>

                            <div id="app-footer" className="u-flex-none">
                                <CurrentFooter />
                            </div>
                        </div>
                    :
                        <Offline retry={reload} />
                    }
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
        },
        fetchPage: (url, pageComponent, routeName) => dispatch(appActions.fetchPage(url, pageComponent, routeName))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
