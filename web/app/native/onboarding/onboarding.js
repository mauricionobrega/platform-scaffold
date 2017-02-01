// React
import React from 'react'
import {render} from 'react-dom'

// Onboarding
import Onboarding from '../../containers/onboarding/container'

// Carousel data array
import carouselData from '../../containers/onboarding/data/onboarding.json'

import Stylesheet from './index.scss' // eslint-disable-line no-unused-vars

const rootEl = document.getElementsByClassName('react-target')[0]

render(<Onboarding carouselData={carouselData} />, rootEl)
