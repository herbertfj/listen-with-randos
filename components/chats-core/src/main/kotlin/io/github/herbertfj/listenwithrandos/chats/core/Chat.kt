package io.github.herbertfj.listenwithrandos.chats.core

import java.time.Instant

data class Chat(
    val id: String? = null,
    val message: String,
    val time: Instant,
    val user: ChatUser
)
