package io.github.herbertfj.listenwithrandos.components.chats

import java.time.Instant

data class Chat(
    val id: String? = null,
    val message: String,
    val time: Instant,
    val user: ChatUser
)
