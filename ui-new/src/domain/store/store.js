// @flow

import {createStore} from 'redux'
import type {Store} from 'redux'
import {reducer} from './reducer/reducer'
import type {State} from './reducer/reducer'
import type {AppAction} from './actions/actions'

export type AppStore = Store<State, AppAction>

export const initializeStore = (): AppStore => {
  const storedState = window.localStorage.getItem('state')

  const preloadedState: $Shape<State> = storedState ? JSON.parse(storedState) : {}

  const store = createStore(
    reducer,
    preloadedState,
  )

  store.subscribe(() => {
    const state = store.getState()
    window.localStorage.setItem('state', JSON.stringify(state))
  })

  return store
}
