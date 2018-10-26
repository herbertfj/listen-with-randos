import {combineReducers} from 'redux'
import {combineEpics} from 'redux-observable'
import {accessToken, AccessTokenAction} from './accessToken/accessToken'
import {chats, ChatsAction, sendChatEpic} from './chats/chats'

export type AppAction =
  | AccessTokenAction
  | ChatsAction

export const epic = combineEpics(
  sendChatEpic,
)

const reducers = {
  accessToken,
  chats,
}

export type State = {
  [P in keyof typeof reducers]: ReturnType<(typeof reducers)[P]>
}

export const reducer = combineReducers(reducers)
