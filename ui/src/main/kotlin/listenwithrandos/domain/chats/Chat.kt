package listenwithrandos.domain.chats

import kotlinext.js.js
import listenwithrandos.domain.common.DataClasser
import listenwithrandos.domain.common.DataUnclasser
import kotlin.js.Date

data class Chat(
    val id: String? = null,
    val userId: String,
    val message: String,
    val time: Date
)

class ChatClasser: DataClasser<Chat> {
    override operator fun invoke(dynamic: dynamic): Chat {
        return Chat(
            id = dynamic.id as String?,
            userId = dynamic.userId as String,
            message = dynamic.message as String,
            time = Date(dynamic.time as String)
        )
    }
}

class ChatUnclasser: DataUnclasser<Chat> {
    override operator fun invoke(data: Chat): dynamic {
        return js {
            this["id"] = id
            this["userId"] = userId
            this["message"] = message
            this["time"] = time
        }
    }
}
