import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { App } from "./app/App"
import { initializeStore } from "./domain/store"
import "./index.scss"
import * as serviceWorker from "./serviceWorker"
import { ConnectedRouter } from "connected-react-router"
import createBrowserHistory from "history/createBrowserHistory"

const history = createBrowserHistory()
const store = initializeStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
