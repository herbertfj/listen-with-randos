import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"
import { loginEpic, user, UserAction } from "./user/user"
import { chats, ChatsAction, sendChatEpic } from "./chats/chats"

export type AppAction = UserAction | ChatsAction

export const epic = combineEpics(sendChatEpic, loginEpic)

const reducers = {
  user,
  chats,
}

export type State = {
  [P in keyof typeof reducers]: ReturnType<(typeof reducers)[P]>
}

export const reducer = combineReducers(reducers)

export const isLoggedIn = (state: State) => !!state.user.userInfo
