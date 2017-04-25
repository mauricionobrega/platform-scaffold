import React from 'react'
import {isRunningInAstro} from '../../utils/astro-integration'

import SearchResultHeader from './partials/search-result-header'
import SearchResultContent from './partials/search-result-content'

const SearchResult = () => (
    <div className="t-search-result">
        {!isRunningInAstro &&
            <SearchResultHeader />
        }
        <SearchResultContent />
    </div>
)

export default SearchResult
