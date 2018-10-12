// @flow

import {createStore, DeepPartial} from 'redux'
import {reducer} from './reducer'
import type {State} from './state'

export const initializeStore = () => {
  const storedState = window.localStorage.getItem('state')

  const preloadedState: DeepPartial<State> = storedState ? JSON.parse(storedState) : {}

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
