// @flow

export type KeepTokenAction = {
  type: 'KEEP_TOKEN_ACTION',
  token: string
}

export type LogoutAction = {
  type: 'LOGOUT_ACTION'
}

export type AppAction
  = KeepTokenAction
  | LogoutAction
