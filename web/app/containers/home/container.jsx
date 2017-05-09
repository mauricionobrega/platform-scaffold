/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'

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

export default Home
