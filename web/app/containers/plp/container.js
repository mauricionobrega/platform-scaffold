import React from 'react'
import template from '../../template'

import PLPHeader from './partials/plp-header'
import PLPContents from './partials/plp-contents'

const PLP = () => {
    return (
        <div className="t-plp">
            <PLPHeader />
            <PLPContents />
        </div>
    )
}

export default template(PLP)
