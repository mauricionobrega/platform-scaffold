import React from 'react'
import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'

// import * as plpActions from './actions'

const PLP = () => {
    return (
        <div className="t-plp">
            <h2>
                PLP page
            </h2>
            <div>
                <Link href="/">
                Go home
                </Link>
            </div>
            <div>
                <Link href="/potions.html">
                    Go to potions
                </Link>
            </div>
            <div>
                <Link href="/ingredients.html">
                    Go to ingredients
                </Link>
            </div>
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
