import React, {PropTypes} from 'react'
import classNames from 'classnames'
import clippy from './clippy'
const componentClass = 'c-clippy'

/**
 * Your annoying assistant
 */

class Clippy extends React.Component {
    componentDidMount() {
      clippy.load('Clippy', `.${componentClass}__agent`, function(agent) {
          // Do anything with the loaded agent
          agent.show();
          function timeout() {
              setTimeout(function () {
                  agent.animate();
                  timeout();
              }, 2000);
          }

          timeout();
      })
    }
    render() {
        const {
            className
        } = this.props

        const classes = classNames(componentClass, className)

        return (
            <div className={classes}>
                <div className="u-flexbox u-align-center">
                    <div className={`${componentClass}__card u-padding-md`}>
                        <div className={`${componentClass}__message`}>
                            Clippy's most recent message will go here
                        </div>
                    </div>
                    <div className={`${componentClass}__agent`} />
                </div>
            </div>
        )
    }
}


Clippy.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default Clippy
