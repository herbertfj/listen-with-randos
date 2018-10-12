// @flow

import {combineReducers} from 'redux'
import type {State} from './state'
import type {AppAction} from './actions'

const accessToken = (state: ?string = null, action: AppAction): ?string => {
  switch (action.type) {
    case 'KEEP_TOKEN_ACTION':
      return action.token
    default:
      return state
  }
}

export const reducer = combineReducers<State, AppAction>({
  accessToken
})
