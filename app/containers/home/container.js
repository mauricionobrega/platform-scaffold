import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {createStructuredSelector} from 'reselect'

import * as selectors from './selectors'
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

class Home extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.home, nextProps.home)
    }

    render() {
        const {banners, categories} = this.props.home.toJS()

        return (
            <div className="t-home__container">
                <HomeCarousel banners={banners} />
                <HomeCategories categories={categories} />
            </div>
        )
    }
}

Home.propTypes = {
    home: PropTypes.object.isRequired
}

const mapStateToProps = createStructuredSelector({
    home: selectors.getHome
})

export default connect(
    mapStateToProps
)(Home)
