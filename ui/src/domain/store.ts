import { applyMiddleware, createStore, Store } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { AppAction, epic, reducer, State } from "./root"

export type AppStore = Store<State, AppAction>

export const initializeStore = (): AppStore => {
  const storedState = window.sessionStorage.getItem("state")
  const preloadedState = storedState ? JSON.parse(storedState) : {}

  const epicMiddleware = createEpicMiddleware()

  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(epicMiddleware)
  )

  epicMiddleware.run(epic)

  store.subscribe(() => {
    const state = store.getState()
    window.sessionStorage.setItem("state", JSON.stringify(state))
  })

  return store
}
