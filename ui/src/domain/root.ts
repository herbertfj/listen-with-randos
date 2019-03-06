import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"
import { user, UserAction, userEpic } from "./user/user"
import { chats, ChatsAction, chatsEpic } from "./chats/chats"
import { History } from "history"
import { connectRouter } from "connected-react-router"

export type AppAction = UserAction | ChatsAction

export const epic = combineEpics(chatsEpic, userEpic)

const reducers = {
  user,
  chats,
}

export type State = {
  [P in keyof typeof reducers]: ReturnType<(typeof reducers)[P]>
}

export const reducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  })

export const isLoggedIn = (state: State) => !!state.user.userInfo
