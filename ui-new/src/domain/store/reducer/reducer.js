// @flow

import {combineReducers} from 'redux'
import type {AppAction} from '../actions/actions'
import {KEEP_TOKEN, LOGOUT} from '../actions/actions'

const accessToken = (state?: string | null = null, action: AppAction): string | null => {
  switch (action.type) {
    case KEEP_TOKEN:
      return action.token
    case LOGOUT:
      return null
    default:
      return state
  }
}

const reducers = {
  accessToken
}

export const reducer = combineReducers(reducers)

export type State = $ObjMap<typeof reducers, <V>(v: (...args: any) => V) => V>
