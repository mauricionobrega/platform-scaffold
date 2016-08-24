import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {Provider} from 'react-redux'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'

const AppProvider = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="login.html" routeName="login" />
                    <Route component={PLP} path="potions.html" routeName="productListPage" />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
