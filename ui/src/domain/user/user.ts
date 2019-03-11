import { Action, combineReducers, Reducer } from "redux"
import { combineEpics, Epic, ofType } from "redux-observable"
import { flatMap, map, mapTo, switchMap } from "rxjs/operators"
import { fetchGet } from "../fetch/fetchGet"
import { push, replace } from "connected-react-router"
import { routes } from "../../config/routes"
import { fetchPost } from "../fetch/fetchPost"

const KEEP_TOKEN = "KEEP_TOKEN"
const LOGOUT = "LOGOUT"
const LOGIN = "LOGIN"
const REGISTER = "REGISTER"

export type User = {
  id: string
  displayName: string
  spotifyId: string
}

type KeepTokenAction = {
  type: typeof KEEP_TOKEN
  payload: {
    token: string
  }
}

type LoginAction = {
  type: typeof LOGIN
  payload: {
    user: User
  }
}

type LogoutAction = {
  type: typeof LOGOUT
}

type RegisterAction = {
  type: typeof REGISTER
  payload: {
    user: Partial<User>
  }
}

export type UserAction =
  | KeepTokenAction
  | LogoutAction
  | LoginAction
  | RegisterAction

const accessToken: Reducer<string | null, UserAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case KEEP_TOKEN:
      return action.payload.token
    case LOGOUT:
      return null
    default:
      return state
  }
}

const userInfo: Reducer<User | null, UserAction> = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload.user
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
  payload: {
    token,
  },
})

const login = (user: User): LoginAction => ({
  type: LOGIN,
  payload: {
    user,
  },
})

export const register = (user: Partial<User>): RegisterAction => ({
  type: REGISTER,
  payload: {
    user,
  },
})

const authorizeEpic: Epic = $action =>
  $action.pipe(
    ofType<Action, KeepTokenAction>(KEEP_TOKEN),
    map(action => action.payload.token),
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

const registerEpic: Epic = $action =>
  $action.pipe(
    ofType<Action, RegisterAction>(REGISTER),
    map(action => action.payload.user),
    flatMap(user => fetchPost("/api/users", user)),
    map(login)
  )

const loginEpic: Epic = $action =>
  $action.pipe(
    ofType<Action, LoginAction>(LOGIN),
    mapTo(replace(routes.HOME))
  )

export const userEpic = combineEpics(authorizeEpic, registerEpic, loginEpic)
