package listenwithrandos.domain.chats

import listenwithrandos.common.fetch
import org.w3c.fetch.RequestInit
import kotlin.js.Promise
import kotlinx.serialization.json.JSON

fun sendChat(chat: Chat): Promise<Chat> {
    val init = RequestInit(
        method = "POST",
        body = JSON.stringify(chat)
    )

    return fetch("/api/chats", init)
}
