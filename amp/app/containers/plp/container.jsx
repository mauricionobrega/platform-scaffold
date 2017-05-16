import Page from '../../components/page/'
import {connect} from 'react-redux'

const containerClass = 't-plp'

const mapStateToProps = (state) => ({
    links: state.links,
    title: `PLP! - ${state.title}` || '',
    className: containerClass
})


const mapDispatchToProps = {}


const PLP = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)


export default PLP
