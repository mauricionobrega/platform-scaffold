import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {selectorToJS} from '../../../utils/selector-utils'

import Field from 'progressive-web-sdk/dist/components/field'

const ProductDetailsVariations = ({variations}) => {
    return (
        <div>
            {variations &&
                variations.map(({id, name, values}) => {
                    return (
                        <Field label={name} key={id}>
                            <select name={id}>
                                {values && values.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
                            </select>
                        </Field>
                    )
                })
            }
            <div>test</div>
        </div>
    )
}

ProductDetailsVariations.propTypes = {
    variations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
        }))
    }))
}

const mapStateToProps = createStructuredSelector({
    variations: selectorToJS(selectors.getVariationOptions)
})

export default connect(
    mapStateToProps
)(ProductDetailsVariations)
