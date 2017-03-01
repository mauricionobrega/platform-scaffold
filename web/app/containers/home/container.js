import React from 'react'

// Partials
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'
import HomeNearestStores from './partials/home-nearest-stores'

import {isRunningInAstro} from '../../utils/astro-integration'

const Home = () => {
    return (
        <div className="t-home__container">
            <HomeCarousel />
            <HomeCategories />
            {!isRunningInAstro &&
                <HomeNearestStores title="Nearest Stores" viewAllStoresText="View All Stores" className="u-padding-start u-padding-end u-padding-bottom-md" />
            }
        </div>
    )
}

export default Home
