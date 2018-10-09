package listenwithrandos.domain.chats

import listenwithrandos.domain.common.DataClasser
import listenwithrandos.domain.common.DataUnclasser
import kotlin.js.Date

data class Chat(
    val id: String? = null,
    val userId: String,
    val message: String,
    val time: Date
)

val chatClasser: DataClasser<Chat> = {
    Chat(
        id = it.id as String?,
        userId = it.userId as String,
        message = it.message as String,
        time = Date(it.time as String)
    )
}

val chatUnclasser: DataUnclasser<Chat> = {
    kotlinext.js.js {
        this["id"] = it.id
        this["userId"] = it.userId
        this["message"] = it.message
        this["time"] = it.time
    }
}
