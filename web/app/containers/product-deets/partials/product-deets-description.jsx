import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const ProductDeetsDescription = () => (
    <Accordion className="t-product-deets__description">
        <AccordionItem header="Details" closeIconName="close" openIconName="plus">
            <p>A maxi in full-on sequin mode is a laid-back way to shine. This season, we opted
            for clear sparklers, so you can catch the light without drifting into disco-ville.
            The shimmery stripes miter at the V-neck top for a flattering effect, whether you
            top the frock with a cashmere duster by day or wear it solo to every party of the season.
            </p>

            <ul>
                <li>Sleeveless</li>
                <li>Pull-on style</li>
                <li>Gathered, elastic waist</li>
                <li>Pima cotton/modal</li>
                <li>Unlined</li>
                <li>Imported</li>
            </ul>
        </AccordionItem>
    </Accordion>
)

ProductDeetsDescription.propTypes = {
    description: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    description: selectors.getProductDescription
})

export default connect(mapStateToProps)(ProductDeetsDescription)
