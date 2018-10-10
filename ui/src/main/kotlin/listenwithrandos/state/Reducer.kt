package listenwithrandos.state

import kotlinext.js.js
import listenwithrandos.domain.chats.Chat
import redux.RAction
import redux.ReducerContainer
import redux.combineReducers

fun accessToken(state: String? = null, action: AppAction) = when (action) {
    is KeepTokenAction -> action.token
    is LogoutAction -> null
    else -> state
}

fun chats(state: List<Chat> = listOf(), action: AppAction) = when (action) {
    is SetChats -> action.chats
    else -> state
}

val reducers = mapOf(
    "accessToken" to ::accessToken,
    "chats" to ::chats
)
val reducer = combineReducers<State, RAction>(js {
    reducers.forEach { this[it.key] = it.value }
}.unsafeCast<ReducerContainer<State, RAction>>())
