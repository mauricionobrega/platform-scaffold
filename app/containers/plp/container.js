import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'

// import * as plpActions from './actions'

const PLP = () => {
    return (
        <div>
            <h2>
                PLP page
            </h2>
            <Link href="/">
                Go home
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.PLP,
    }
}


export default connect(
    mapStateToProps
)(PLP)
