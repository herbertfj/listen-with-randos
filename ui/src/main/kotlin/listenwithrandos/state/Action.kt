package listenwithrandos.state

import redux.RAction
import listenwithrandos.domain.chats.Chat

sealed class AppAction: RAction
data class KeepTokenAction(val token: String): AppAction()
object LogoutAction: AppAction()
data class SetChats(val chats: List<Chat>): AppAction()
