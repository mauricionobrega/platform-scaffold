import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {onVariationBlur} from '../actions'

import Field from 'progressive-web-sdk/dist/components/field'

const ProductDetailsVariations = ({variations, onVariationBlur}) => {
    return (
        <div>
            {variations &&
                variations.map(({id, name, values}) => {
                    return (
                        <ReduxForm.Field
                            label={name}
                            name={id}
                            component={Field}
                            key={id}
                            className="u-margin-bottom-lg u-margin-top"
                            customEventHandlers={{
                                onBlur: onVariationBlur
                            }}
                        >
                            <select name={id}>
                                {/* Include an empty option to show by default */}
                                <option />
                                {values && values.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
                            </select>
                        </ReduxForm.Field>
                    )
                })
            }
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
    })),
    onVariationBlur: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    variations: selectors.getVariationOptions
})

const mapDispatchToProps = {
    onVariationBlur

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsVariations)
