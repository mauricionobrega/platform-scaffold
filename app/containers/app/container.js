import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'
import SkipLinks from '../../components/skip-links'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import Navigation from '../../containers/navigation/container'
import * as navActions from '../../containers/navigation/actions'


class App extends React.Component {
    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    render() {
        const {openNavigation, history} = this.props
        const currentTemplate = `t-${this.props.children.props.route.routeName}`

        return (
            <div id="app" className="t-app">
                <IconSprite />
                <SkipLinks />

                <div id="app-wrap" className={currentTemplate}>
                    <div id="app-header" role="banner">
                        <Header onMenuClick={openNavigation} />
                        <Navigation history={history} />
                    </div>

                    <main id="app-main" role="main">
                        {this.props.children}
                    </main>

                    <div id="app-footer">
                        <Footer />
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
    openNavigation: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        ...state.app,
    }
}

const mapDispatchToProps = {
    openNavigation: navActions.openNavigation
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
