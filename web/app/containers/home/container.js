import React from 'react'

// Partials
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'
import HomeNearestStores from './partials/home-nearest-stores'

const Home = () => {
    return (
        <div className="t-home__container">
            <HomeCarousel />
            <HomeCategories />
            <HomeNearestStores title="Nearest Stores" viewAllStoresText="View All Stores" className="u-padding-start u-padding-end u-padding-bottom-md" />
        </div>
    )
}

export default Home
