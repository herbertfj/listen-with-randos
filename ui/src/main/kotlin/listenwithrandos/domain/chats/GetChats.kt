package listenwithrandos.domain.chats

import listenwithrandos.common.fetch
import listenwithrandos.domain.common.listClasser
import kotlin.js.Promise

fun getChats(): Promise<List<Chat>> {
    return fetch("/api/chats", null)
}
