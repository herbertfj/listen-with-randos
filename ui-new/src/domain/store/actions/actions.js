// @flow

export const KEEP_TOKEN: 'KEEP_TOKEN' = 'KEEP_TOKEN'
export const LOGOUT: 'LOGOUT' = 'LOGOUT'
export const SEND_CHAT: 'SEND_CHAT' = 'SEND_CHAT'
export const KEEP_CHATS: 'KEEP_CHATS' = 'KEEP_CHATS'

export type KeepTokenAction = {
  type: typeof KEEP_TOKEN,
  token: string
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type Chat = {
  id?: string,
  userId: string,
  message: string,
  time: Date
}

export type KeepChatsAction = {
  type: typeof KEEP_CHATS,
  chats: Array<Chat>
}

export type SendChatAction = {
  type: typeof SEND_CHAT,
  chat: Chat
}

export type AppAction =
  | KeepTokenAction
  | LogoutAction
  | KeepChatsAction
  | SendChatAction

export type Dispatch = (action: AppAction) => AppAction
