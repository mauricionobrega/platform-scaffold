import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'

let triggerPageView = function(){
    triggerMobifyPageView(this.routeName)
}

const AppProvider = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} routeName="home" onEnter={triggerPageView} />
                    <Route component={Login} path="customer/account/login/" routeName="login" onEnter={triggerPageView} />
                    <Route component={PLP} path="*.html" routeName="productListPage" onEnter={triggerPageView} />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
