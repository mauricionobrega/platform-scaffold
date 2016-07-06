import {PropTypes} from 'react'

/* eslint-disable react/prop-types */

class App extends React.Component {

    componentDidMount() {
        this.props.removePreloader()
    }

    render() {
        let templateName = `t-${this.props.children.props.route.routeName}`

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

App.propTypes = {
    removePreloader: PropTypes.func
}

export default App
