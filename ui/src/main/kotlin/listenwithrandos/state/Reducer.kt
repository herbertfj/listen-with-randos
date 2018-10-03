package listenwithrandos.state

import kotlinext.js.js
import redux.RAction
import redux.ReducerContainer
import redux.combineReducers

fun myReducer(state: String = "") = state
fun myOtherReducer(state: Number = 0) = state

fun accessToken(state: String? = null, action: AppAction) = when {
    action is KeepTokenAction -> action.token
    else -> state
}

val reducers = mapOf(
    "name" to ::myReducer,
    "number" to ::myOtherReducer,
    "accessToken" to ::accessToken
)
val reducer = combineReducers<State, RAction>(js {
    reducers.forEach { this[it.key] = it.value }
}.unsafeCast<ReducerContainer<State, RAction>>())
