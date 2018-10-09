package listenwithrandos.domain.chats

import listenwithrandos.common.fetch
import listenwithrandos.domain.common.arrayClasser
import kotlin.js.Promise

fun getChats(): Promise<Array<Chat>> {
    return fetch("/api/chats", null, arrayClasser(chatClasser))
}
