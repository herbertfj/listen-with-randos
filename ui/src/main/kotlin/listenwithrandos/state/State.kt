package listenwithrandos.state

import kotlinx.serialization.Serializable
import listenwithrandos.domain.chats.Chat

@Serializable
class State: Any() {
    var accessToken: String? = null
    var chats: List<Chat> = emptyList()
}
