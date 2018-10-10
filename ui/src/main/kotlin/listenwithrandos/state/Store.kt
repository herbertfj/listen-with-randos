package listenwithrandos.state

import kotlinext.js.js
import kotlinx.serialization.json.JSON
import redux.RAction
import redux.Store
import redux.WrapperAction
import redux.rEnhancer
import kotlin.browser.window

fun createStore(): Store<State, RAction, WrapperAction> {
    val storedState = window.localStorage.getItem("state")?.let {
        val state = JSON.parse<State>(it)
        console.log(state)
        state
    }

    val preloadedState = storedState ?: js {}

    val store = redux.createStore(
        reducer,
        preloadedState,
        rEnhancer()
    )

    store.subscribe {
        console.log(store.getState())
        val state = JSON.stringify(store.getState().unsafeCast<State>())
        println(state)
        window.localStorage.setItem("state", state)
    }

    return store
}
