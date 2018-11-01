import { Action, Reducer } from "redux"
import { Epic, ofType } from "redux-observable"
import { concatMap, map, switchMap } from "rxjs/operators"
import { fetchGet } from "../fetch/fetchGet"
import { fetchPost } from "../fetch/fetchPost"

export type Chat = {
  id?: string
  userId: string
  message: string
  time: Date
}

export const SEND_CHAT = "SEND_CHAT"
const KEEP_CHATS = "KEEP_CHATS"

type KeepChatsAction = {
  type: typeof KEEP_CHATS
  chats: Chat[]
}

type SendChatAction = {
  type: typeof SEND_CHAT
  chat: Chat
}

export type ChatsAction = KeepChatsAction | SendChatAction

export const chats: Reducer<Chat[], ChatsAction> = (state = [], action) => {
  switch (action.type) {
    case KEEP_CHATS:
      return action.chats
    default:
      return state
  }
}

export const sendChat = (chat: Chat): SendChatAction => ({
  type: SEND_CHAT,
  chat,
})

export const keepChats = (chatsToKeep: Chat[]): KeepChatsAction => ({
  type: KEEP_CHATS,
  chats: chatsToKeep,
})

const getChats = (): Promise<Chat[]> => {
  return fetchGet("/api/chats")
}

const postChat = (chat: Chat): Promise<Chat> => {
  return fetchPost("/api/chats", chat)
}

export const sendChatEpic: Epic = action$ =>
  action$.pipe(
    ofType<Action, SendChatAction>(SEND_CHAT),
    concatMap(action => postChat((action as SendChatAction).chat)),
    switchMap(() => getChats()),
    map(keepChats)
  )
