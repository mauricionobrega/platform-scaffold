import React from 'react'
import Banner from 'progressive-web-sdk/dist/components/banner'

// Partials
import HomeCarousel from './partials/home-carousel'
import HomeCategories from './partials/home-categories'

const Home = () => {
    return (
        <div className="t-home__container">
            <Banner icon="info" title="info">
                Save 20% on your order with the code SAVEBIG
            </Banner>
            <HomeCarousel />
            <HomeCategories />
        </div>
    )
}

export default Home
