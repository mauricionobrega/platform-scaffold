import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'
import SkipLinks from '../../components/skip-links'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'


class App extends React.Component {
    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    render() {
        const currentTemplate = `t-${this.props.children.props.route.routeName}`

        return (
            <div id="app" className="t-app">
                <IconSprite />
                <SkipLinks />

                <div id="app-wrap" className={currentTemplate}>
                    <div id="app-header" role="banner">
                        <Header />
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
    children: PropTypes.element.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.app,
    }
}

const mapDispatchToProps = () => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
