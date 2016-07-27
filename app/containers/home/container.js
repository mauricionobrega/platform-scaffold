import {connect} from 'react-redux'
import {Link} from 'react-router'
import styles from './home.scss' // eslint-disable-line no-unused-vars

// import * as homeActions from './actions'

const Home = () => {
    return (
        <div>
            <h2>
                Home Page
            </h2>
            <Link to="/potions.html">
                View potions
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.home,
    }
}


export default connect(
    mapStateToProps
)(Home)
