import React from 'react'

import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import Link from 'progressive-web-sdk/dist/components/link'
import {HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

const HeaderTitle = ({linkClassName, logo}) => (
    <div className="u-flex">
        <HeaderBarTitle>
            <Link href="/" className={linkClassName}>
                <DangerousHTML html={logo}>
                    {(htmlObj) => <div className="t-header__logo" dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>
                <h1 className="u-visually-hidden">Merlin's Potions</h1>
            </Link>
        </HeaderBarTitle>
    </div>
)

export default HeaderTitle
