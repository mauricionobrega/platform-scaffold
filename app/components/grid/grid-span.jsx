import React, {PropTypes} from 'react'
import classNames from 'classnames'

const MOBILE_BREAKPOINT = 'mobile'
const TABLET_BREAKPOINT = 'tablet'
const DESKTOP_BREAKPOINT = 'desktop'
const MOBILE_COLUMN_COUNT = 4
const TABLET_COLUMN_COUNT = 8
const DESKTOP_COLUMN_COUNT = 12

const generateModifiers = (breakpoint, maxColumnCount, props) => {
    const classes = {}

    // Generate a class modifier for each combination of possible column counts.
    // Creates modifiers from 1 up to the value of `maxColumnCount`
    for (let i = 1; i <= maxColumnCount; i++) {
        const columnSpanCountIsActive = props[breakpoint] && props[breakpoint].span === i
        classes[`c--span-${i}@${breakpoint}`] = columnSpanCountIsActive
    }

    for (let i = 1; i < maxColumnCount; i++) {
        // Generate classes for each pre modifier class. Adds padding on the
        // along the right side of the grid span equal to `pre` number of
        // columns plus gutters
        const preCountIsActive = props[breakpoint] && props[breakpoint].pre === i
        classes[`c--pre-${i}@${breakpoint}`] = preCountIsActive

        // Generate classes for each post modifier class. Adds padding on the
        // along the right side of the grid span equal to `post` number of
        // columns plus gutters
        const postCountIsActive = props[breakpoint] && props[breakpoint].post === i
        classes[`c--post-${i}@${breakpoint}`] = postCountIsActive
    }

    // Generate full width modifier class for when there is no span provided, or
    // if the span value is larger than the grid's max number of columns at the
    // current breakpoint
    const spanOrBreakpointIsMissing = !props[breakpoint] || !props[breakpoint].span
    const spanIsOverMaxSize = (
        breakpoint === MOBILE_BREAKPOINT && props[breakpoint] && props[breakpoint].span > MOBILE_COLUMN_COUNT ||
        breakpoint === TABLET_BREAKPOINT && props[breakpoint] && props[breakpoint].span > TABLET_COLUMN_COUNT ||
        breakpoint === DESKTOP_BREAKPOINT && props[breakpoint] && props[breakpoint].span > DESKTOP_COLUMN_COUNT
    )
    classes[`c--full-width@${breakpoint}`] = spanOrBreakpointIsMissing || spanIsOverMaxSize

    return classes
}


/**
 * GridSpan the grid component that does much of the heavy lifting. It is where
 * all the grid layout behavior for all the breakpoints is defined.
 *
 * Our grid framework of choice is [Susy](http://susydocs.oddbird.net/en/latest/)
 * and all of Grid's and GridSpan's behaviors are defined with the Susy mixins.
 */
const GridSpan = (props) => {
    const classes = classNames('c-grid__span', {
        ...generateModifiers(MOBILE_BREAKPOINT, MOBILE_COLUMN_COUNT, props),
        ...generateModifiers(TABLET_BREAKPOINT, TABLET_COLUMN_COUNT, props),
        ...generateModifiers(DESKTOP_BREAKPOINT, DESKTOP_COLUMN_COUNT, props),
    }, props.className)

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

const breakpointShape = {
    span: PropTypes.number,
    pre: PropTypes.number,
    post: PropTypes.number,
}

GridSpan.propTypes = {
    /**
     * Any children to be nested within this ProductItem
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Accepts an object shape that defines the `GridSpan`'s behavior at the
     * **desktop** breakpoint. See the below Breakpoint Modifiers section for
     * details about defining the breakpoint behaviors. The actual media query
     * breakpoint is defined in the component's CSS.
     */
    desktop: PropTypes.shape(breakpointShape),

    /**
     * Accepts an object shape that defines the `GridSpan`'s behavior at the
     * **mobile** breakpoint. See the below Breakpoint Modifiers section for
     * details about defining the breakpoint behaviors. The actual media query
     * breakpoint is defined in the component's CSS.
     */
    mobile: PropTypes.shape(breakpointShape),

    /**
     * Accepts an object shape that defines the `GridSpan`'s behavior at the
     * **tablet** breakpoint. See the below Breakpoint Modifiers section for
     * details about defining the breakpoint behaviors. The actual media query
     * breakpoint is defined in the component's CSS.
     */
    tablet: PropTypes.shape(breakpointShape),
}

export {GridSpan as default, MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT, MOBILE_COLUMN_COUNT, TABLET_COLUMN_COUNT, DESKTOP_COLUMN_COUNT}
