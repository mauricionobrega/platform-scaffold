import {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as homeActions from './actions'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchHomeContents()
    }

    render() {
        return (
            <div>
                <h2>
                    Home Page
                </h2>
                <Link to="/potions.html">
                    View potions
                </Link>
                <div>
                    This is the title of the home page: {this.props.home.get('title')}
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    fetchHomeContents: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomeContents: () => dispatch(homeActions.fetchHomeContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
