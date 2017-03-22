import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {extractPathFromURL} from '../../utils/utils'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Nav from 'progressive-web-sdk/dist/components/nav'
import NavMenu from 'progressive-web-sdk/dist/components/nav-menu'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import IconLabelButton from '../../components/icon-label-button'
import * as merlinsNavItem from '../../components/nav-item'
import * as selectors from './selectors'
import {NAVIGATION_MODAL} from './constants'
import {isModalOpen} from '../../store/selectors'
import {closeModal} from '../../store/modals/actions'
import {setNavigationPath} from './actions'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import {withRouter} from 'progressive-web-sdk/dist/routing'


/**
 * Factory function to create project-specific NavItems
 */
const itemFactory = (type, props) => {
    switch (type) {
        case 'AccountNavItem':
            return <merlinsNavItem.AccountNavItem {...props} />
        default:
            return <NavItem {...props} />
    }
}


const Navigation = (props) => {
    const {path, isOpen, root, closeNavigation, router, setNavigationPath} = props

    const onPathChange = (path, isLeaf) => {
        if (isLeaf) {
            const routerPath = extractPathFromURL(path, true)
            router.push(routerPath)
            setNavigationPath('/')
            closeNavigation()
        } else {
            setNavigationPath(path)
        }
    }

    return (
        <Sheet className="t-navigation" open={isOpen} onDismiss={closeNavigation} maskOpacity={0.7} coverage="85%">
            <Nav root={root.title ? root : null} path={path} onPathChange={onPathChange}>
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h2 className="t-navigation__title u-heading-family u-text-uppercase">
                            <span className="u-text-extra-lighter">Merlin's</span> Potions
                        </h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" onClick={closeNavigation} />
                    </HeaderBarActions>
                </HeaderBar>

                <NavMenu itemFactory={itemFactory} />
            </Nav>
        </Sheet>
    )
}


Navigation.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeNavigation: PropTypes.func,

    isOpen: PropTypes.bool,
    path: PropTypes.string,
    root: PropTypes.object,
    /**
     * The react-router router object.
     */
    router: PropTypes.object,
    /**
    * Sets the current path for the navigation menu
    */
    setNavigationPath: PropTypes.func
}


const mapStateToProps = createPropsSelector({
    path: selectors.getPath,
    isOpen: isModalOpen(NAVIGATION_MODAL),
    root: selectors.getNavigationRoot
})

const mapDispatchToProps = {
    closeNavigation: () => closeModal(NAVIGATION_MODAL),
    setNavigationPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
