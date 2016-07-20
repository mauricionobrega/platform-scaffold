import {PropTypes} from 'react'

const Example = ({
    text
}) => {
    return (
        <div>
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
