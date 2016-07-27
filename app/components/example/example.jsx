import {PropTypes} from 'react'
import classNames from 'classnames'
import styles from './example.scss'

const Example = ({
    text
}) => {
    return (
        <div className="c-example">
            I am an example! {text}
        </div>
    )
}

Example.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in Styleguidist
     */
    text: PropTypes.string.isRequired
}

export default Example
