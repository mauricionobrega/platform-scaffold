import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as <%= page.name %>Actions from './actions'

export const <%= page.Name %> = () => {
    return (
        <div>

        </div>
    )
}

export const mapStateToProps = (state, props) => {
    return {
            ...state.<%= page.name %>,
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(<%= page.Name %>)
