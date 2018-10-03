package listenwithrandos.state

import redux.RAction

sealed class AppAction: RAction
data class KeepTokenAction(val token: String): AppAction()
