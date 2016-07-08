import {connect} from 'react-redux'

import * as appActions from './actions'

class App extends React.Component {

    componentDidMount() {
        this.props.removePreloader()
    }

    render() {
        let templateName = 't-' + this.props.children.props.route.routeName

        return (
            <div id="outer-container" className={templateName} style={{height: '100%'}}>
                <main id="page-wrap">
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

const mapStateToProps = (state) => {
    return {
        ...state.app,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        removePreloader: () => {
            dispatch(appActions.removePreloader())
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
