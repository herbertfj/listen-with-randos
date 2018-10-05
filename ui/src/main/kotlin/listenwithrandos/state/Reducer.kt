package listenwithrandos.state

import kotlinext.js.js
import redux.RAction
import redux.ReducerContainer
import redux.combineReducers

fun accessToken(state: String? = null, action: AppAction) = when (action) {
    is KeepTokenAction -> action.token
    is LogoutAction -> null
    else -> state
}

val reducers = mapOf(
    "accessToken" to ::accessToken
)
val reducer = combineReducers<State, RAction>(js {
    reducers.forEach { this[it.key] = it.value }
}.unsafeCast<ReducerContainer<State, RAction>>())
