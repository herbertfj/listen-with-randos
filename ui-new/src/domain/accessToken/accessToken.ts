import { Reducer } from "redux"

export const KEEP_TOKEN = "KEEP_TOKEN"
export const LOGOUT = "LOGOUT"

export type KeepTokenAction = {
  type: typeof KEEP_TOKEN
  token: string
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type AccessTokenAction = KeepTokenAction | LogoutAction

export const accessToken: Reducer<string | null, AccessTokenAction> = (
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
