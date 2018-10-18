// @flow

import {combineReducers} from 'redux'
import type {AppAction, Chat} from '../actions/actions'
import {KEEP_CHATS, KEEP_TOKEN, LOGOUT} from '../actions/actions'

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

const chats = (state?: Array<Chat> = [], action: AppAction): Array<Chat> => {
  switch (action.type) {
    case KEEP_CHATS:
      return action.chats
    default:
      return state
  }
}

const reducers = {
  accessToken,
  chats,
}

export const reducer = combineReducers(reducers)

export type State = $ObjMap<typeof reducers, <V>(v: (...args: any) => V) => V>
