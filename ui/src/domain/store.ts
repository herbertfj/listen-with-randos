import { applyMiddleware, createStore, Store, compose } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { AppAction, epic, reducer, State } from "./root"
import { History } from "history"
import { routerMiddleware } from "connected-react-router"

export type AppStore = Store<State, AppAction>

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

export const initializeStore = (history: History): AppStore => {
  const storedState = window.sessionStorage.getItem("state")
  const preloadedState = storedState ? JSON.parse(storedState) : {}

  const epicMiddleware = createEpicMiddleware()

  const store = createStore(
    reducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )

  epicMiddleware.run(epic)

  store.subscribe(() => {
    const state = store.getState()
    window.sessionStorage.setItem("state", JSON.stringify(state))
  })

  return store
}
