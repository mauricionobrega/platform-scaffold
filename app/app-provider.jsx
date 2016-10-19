import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'
import * as appActions from './containers/app/actions'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'


const AppProvider = ({store}) => {

    const onEnter = (nextState) => {
        const routeName = nextState.routes[1].routeName
        triggerMobifyPageView(routeName)
        store.dispatch(appActions.fetchPage('http://www.merlinspotions.com/'))
    }

    const onChange = (prevState, nextState) => {
        onEnter(nextState)
    }

    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="customer/account/login/" routeName="login" />
                    <Route component={PLP} path="*.html" routeName="productListPage" />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
