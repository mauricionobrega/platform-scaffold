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
     * The text of the button.
     */
    text: PropTypes.string.isRequired
}

export default Example
