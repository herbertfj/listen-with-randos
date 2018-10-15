// @flow

export const KEEP_TOKEN: 'KEEP_TOKEN' = 'KEEP_TOKEN'
export const LOGOUT: 'LOGOUT' = 'LOGOUT'

export type KeepTokenAction = {
  type: typeof KEEP_TOKEN,
  token: string
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type AppAction =
  | KeepTokenAction
  | LogoutAction

export type Dispatch = (action: AppAction) => AppAction
