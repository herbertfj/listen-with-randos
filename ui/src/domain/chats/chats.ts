import { Action, Reducer } from "redux"
import { combineEpics, Epic, ofType } from "redux-observable"
import { concatMap, map, switchMap } from "rxjs/operators"
import { fetchGet } from "../fetch/fetchGet"
import { fetchPost } from "../fetch/fetchPost"

export type Chat = {
  id?: string
  userId: string
  message: string
  time: Date
}

const SEND_CHAT = "SEND_CHAT"
const KEEP_CHATS = "KEEP_CHATS"
const LOAD_CHATS = "LOAD_CHATS"

type KeepChatsAction = {
  type: typeof KEEP_CHATS
  chats: Chat[]
}

type SendChatAction = {
  type: typeof SEND_CHAT
  chat: Chat
}

type LoadChatsAction = {
  type: typeof LOAD_CHATS
}

export type ChatsAction = KeepChatsAction | SendChatAction | LoadChatsAction

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

export const loadChats = (): LoadChatsAction => ({
  type: LOAD_CHATS,
})

const getChats = (): Promise<Chat[]> => {
  return fetchGet("/api/chats")
}

const postChat = (chat: Chat): Promise<Chat> => {
  return fetchPost("/api/chats", chat)
}

const sendChatEpic: Epic = action$ =>
  action$.pipe(
    ofType<Action, SendChatAction>(SEND_CHAT),
    concatMap(action => postChat(action.chat)),
    switchMap(() => getChats()),
    map(keepChats)
  )

const loadChatsEpic: Epic = action$ =>
  action$.pipe(
    ofType<Action, LoadChatsAction>(LOAD_CHATS),
    switchMap(() => getChats()),
    map(keepChats)
  )

export const chatsEpic = combineEpics(sendChatEpic, loadChatsEpic)
