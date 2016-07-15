import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as <% page.name.toLowerCase() %>Actions from './actions'

export const <% page.name %> = () => {
    return (
        <div>

        </div>
    )
}

export const mapStateToProps = (state, props) => {
    return {
            ...state.<% page.name.toLowerCase() %>,
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(<% page.name %>)
