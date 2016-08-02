import {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import styles from './app.scss' // eslint-disable-line no-unused-vars

// import * as appActions from './actions'

class App extends React.Component {
    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    render() {
        let currentTemplate = `t-${this.props.children.props.route.routeName}`

        return (
            <div id="outer-container" className="t-app" style={{height: '100%'}}>
                <main id="page-wrap" className={currentTemplate}>
                    <header>
                        Header content
                    </header>

                    <div id="content">
                        {this.props.children}
                    </div>

                    <footer>
                        Footer content
                    </footer>
                </main>
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
