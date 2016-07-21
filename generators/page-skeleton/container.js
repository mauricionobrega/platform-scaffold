import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as <%= context.name %>Actions from './actions'

export const <%= context.Name %> = () => {
    return (
        <div>

        </div>
    )
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.<%= context.name %>,
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(<%= context.Name %>)
