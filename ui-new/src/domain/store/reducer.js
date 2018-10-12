// @flow

import {combineReducers} from 'redux'
import type {State} from './state'
import type {AppAction} from './actions'
import {KEEP_TOKEN} from './actions'

const accessToken = (state: ?string = null, action: AppAction): ?string => {
  switch (action.type) {
    case KEEP_TOKEN:
      return action.token
    default:
      return state
  }
}

export const reducer = combineReducers<State, AppAction>({
  accessToken
})
