import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import * as selectors from './selectors'
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

const Home = ({banners, categories}) => {

    return (
        <div className="t-home__container">
            <HomeCarousel banners={banners} />
            <HomeCategories categories={categories} />
        </div>
    )
}

Home.propTypes = {
    banners: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = createStructuredSelector({
    banners: selectorToJS(selectors.getHomeBanners),
    categories: selectorToJS(selectors.getHomeCategories)
})

export default connect(
    mapStateToProps
)(Home)
