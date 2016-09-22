import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Link from 'progressive-web-sdk/dist/components/link'
import Button from 'progressive-web-sdk/dist/components/button'
import {mobifyGa} from 'progressive-web-sdk/dist/analytics'

import Logo from '../../components/logo'

import * as homeActions from './actions'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.triggerTapEvent = this.triggerTapEvent.bind(this)
    }

    componentDidMount() {
        this.props.fetchHomeContents()
    }

    triggerTapEvent() {
        // mobifyGa is a proxy method which sends events to our
        // ga loaded through a.js. These events also proxy
        // to Mobify's Engagement Engage. To understand how
        // to trigger mobifyGa, please reference the GA documentation:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/
        mobifyGa('send', {
            hitType: 'event',
            eventCategory: 'ui',
            eventAction: 'tap',
            eventLabel: 'sample component'
        })
    }

    render() {
        return (
            <div>
                <Logo />
                <Link href="/customer/account/login/">
                    Login
                </Link>
                <h2>
                    Home Page
                </h2>
                <Link href="/potions.html">
                    View potions
                </Link>
                <div>
                    This is an example of UTF-8 character set text: テスト勉強　チコメ
                </div>
                <div>
                    This is the title of the home page: {this.props.home.get('title')}
                </div>
                <div className="u-text-all-caps">
                    This is a test
                </div>
                <Button onClick={this.triggerTapEvent}>Themed Component</Button>

                <div id="realContent">
                    <p>Real Main content!</p>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    fetchHomeContents: PropTypes.func.isRequired,
    home: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomeContents: () => dispatch(homeActions.fetchHomeContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
