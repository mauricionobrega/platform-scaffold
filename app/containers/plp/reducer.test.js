import test from 'ava'
import {reducerTest} from 'redux-ava'
import {Map} from 'immutable'

import reducer from './reducer'

test('unknown action type leaves state unchanged', reducerTest(
    reducer,
    Map({test: true}),
    {type: 'QWERTYUIOP'},
    Map({test: true})
))
