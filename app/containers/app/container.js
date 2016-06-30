import {connect} from 'react-redux'

import App from '../../components/app'
import * as appActions from './actions'

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
