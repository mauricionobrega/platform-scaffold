import Page from '../../components/page/'
import {connect} from 'react-redux'

const containerClass = 't-home'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `Home! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export default Home
