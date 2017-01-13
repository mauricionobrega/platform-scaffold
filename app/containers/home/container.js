import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import * as selectors from './selectors'
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

class Home extends React.PureComponent {
    render() {
        const {banners, categories} = this.props.home

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
    home: selectorToJS(selectors.getHome)
})

export default connect(
    mapStateToProps
)(Home)
