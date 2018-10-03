package listenwithrandos.state

import kotlinext.js.js
import redux.*
import kotlin.browser.window

fun createStore(): Store<State, RAction, WrapperAction> {
    val storedState = window.localStorage.getItem("state")?.let { JSON.parse<State>(it) }

    val preloadedState = storedState ?: js {}

    val store = redux.createStore(
        reducer,
        preloadedState,
        rEnhancer()
    )

    store.subscribe {
        val state = JSON.stringify(store.getState() as Any)
        window.localStorage.setItem("state", state)
    }

    return store
}
