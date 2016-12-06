import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

export class Home extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.homeState, nextProps.homeState)
    }

    render() {
        const {banners, categories} = this.props

        return (
            <div className="t-home__container">
                <HomeCarousel banners={banners} />
                <HomeCategories categories={categories} />
            </div>
        )
    }
}

Home.propTypes = {
    banners: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array
    ]).isRequired,
    categories: PropTypes.array.isRequired,
    homeState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        homeState: state.home,
        ...state.home.toJS()
    }
}

export default connect(
    mapStateToProps
)(Home)
