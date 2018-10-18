// @flow

import {ActionsObservable, combineEpics, ofType} from 'redux-observable'
import type {AppAction, Chat} from './actions/actions'
import {KEEP_CHATS, SEND_CHAT} from './actions/actions'
import {concatMap, map, switchMap} from 'rxjs/operators'

const getChats = (): Promise<Array<Chat>> => {
  return fetch('/api/chats', {method: 'GET'})
    .then(res => {
      if (res.ok) {
        return res
      }
      throw new Error()
    })
    .then(res => res.json())
}

const postChat = (chat: Chat): Promise<Chat> => {
  return fetch('/api/chats', {
    method: 'POST',
    body: JSON.stringify(chat),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => {
      if (res.ok) {
        return res
      }
      throw new Error()
    })
    .then(res => res.json())
}

const sendChatEpic = (action$: ActionsObservable<AppAction>) => action$.pipe(
  ofType(SEND_CHAT),
  concatMap(action => postChat(action.chat), x => x),
  switchMap(() => getChats()),
  map(chats => ({
    type: KEEP_CHATS,
    chats,
  })),
)

export const epic = combineEpics(
  sendChatEpic,
)
