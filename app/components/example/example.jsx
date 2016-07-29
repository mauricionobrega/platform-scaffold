import {PropTypes} from 'react'
import classNames from 'classnames'
import styles from './example.scss' // eslint-disable-line no-unused-vars

const Example = ({
    text
}) => {
    let classes = classNames('c-example', {
        // 'c--modifier': bool ? true : false
    })

    return (
        <div className={classes}>
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
