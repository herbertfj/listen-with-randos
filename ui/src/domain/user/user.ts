import { Action, combineReducers, Reducer } from "redux"
import { Epic, ofType } from "redux-observable"
import { flatMap, map, switchMap } from "rxjs/operators"
import { fetchGet } from "../fetch/fetchGet"
import { push } from "connected-react-router"
import { routes } from "../../config/routes"

const KEEP_TOKEN = "KEEP_TOKEN"
const LOGOUT = "LOGOUT"
const LOGIN = "LOGIN"

export type User = {
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

const userInfo: Reducer<User | null, UserAction> = (state = null, action) => {
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

export const logOut = (): LogoutAction => ({
  type: LOGOUT,
})

export const keepToken = (token: string): KeepTokenAction => ({
  type: KEEP_TOKEN,
  token,
})

const login = (user: User): LoginAction => ({
  type: LOGIN,
  user,
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
      displayName: response.display_name,
      spotifyId: response.id,
    })),
    flatMap(user =>
      fetchGet(`/api/users?spotifyId=${user.spotifyId}`)
        .then(response => login(response))
        .catch(() => push(routes.REGISTER, user))
    )
  )
