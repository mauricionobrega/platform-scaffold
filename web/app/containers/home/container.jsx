import React from 'react'

import {fetchHomeData} from '../../integration-manager/home/commands'

// Partials
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

const Home = () => {
    return (
        <div className="t-home__container">
            <HomeCarousel />
            <HomeCategories />
        </div>
    )
}

Home.fetcher = (url, routeName, dispatch) => dispatch(fetchHomeData(url, routeName))

export default Home
