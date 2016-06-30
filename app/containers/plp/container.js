import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as PLPActions from './actions'

const PLP = () => {
    return (
        <div>
            <h2>
                PLP page
            </h2>
            <Link to="/">
                Go home
            </Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ...state.PLP,
    }
}


export default connect(
    mapStateToProps
)(PLP)
