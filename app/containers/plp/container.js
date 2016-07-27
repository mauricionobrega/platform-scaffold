import {connect} from 'react-redux'
import {Link} from 'react-router'
import styles from './plp.scss'

// import * as plpActions from './actions'

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

const mapStateToProps = (state) => {
    return {
        ...state.PLP,
    }
}


export default connect(
    mapStateToProps
)(PLP)
