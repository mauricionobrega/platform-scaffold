import Page from '../../components/page/'
import {connect} from 'react-redux'

const containerClass = 't-pdp'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `PDP! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


const PDP = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export default PDP
