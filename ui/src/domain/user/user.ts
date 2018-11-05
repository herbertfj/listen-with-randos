import { Action, combineReducers, Reducer } from "redux"
import { Epic, ofType } from "redux-observable"
import { map, switchMap } from "rxjs/operators"
import { fetchGet } from "../fetch/fetchGet"

export const KEEP_TOKEN = "KEEP_TOKEN"
export const LOGOUT = "LOGOUT"
const LOGIN = "LOGIN"

type User = {
  displayName: string
  spotifyId: string
}

type KeepTokenAction = {
  type: typeof KEEP_TOKEN
  token: string
}

type LoginAction = {
  type: typeof LOGIN
  user: User
}

type LogoutAction = {
  type: typeof LOGOUT
}

export type UserAction = KeepTokenAction | LogoutAction | LoginAction

const accessToken: Reducer<string | null, UserAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case KEEP_TOKEN:
      return action.token
    case LOGOUT:
      return null
    default:
      return state
  }
}

export const userInfo: Reducer<User | null, UserAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return null
    default:
      return state
  }
}

export const user = combineReducers({
  accessToken,
  userInfo,
})

export const keepToken = (token: string): KeepTokenAction => ({
  type: KEEP_TOKEN,
  token,
})

export const loginEpic: Epic = $action =>
  $action.pipe(
    ofType<Action, KeepTokenAction>(KEEP_TOKEN),
    map(action => action.token),
    switchMap(token =>
      fetchGet("https://api.spotify.com/v1/me", {
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      })
    ),
    map(response => ({
      type: LOGIN,
      user: {
        displayName: response.display_name,
        spotifyId: response.id,
      },
    }))
  )
