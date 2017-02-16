import React from 'react'
import {isRunningInAstro} from '../../utils/astro-integration'

import PLPHeader from './partials/plp-header'
import PLPContents from './partials/plp-contents'

const PLP = () => {
    return (
        <div className="t-plp">
            {!isRunningInAstro &&
                <PLPHeader />
            }
            <PLPContents />
        </div>
    )
}

export default PLP
