package io.github.herbertfj.listenwithrandos.components.chats

import java.time.Instant

data class Chat(
    val id: String? = null,
    val userId: String,
    val message: String,
    val time: Instant
)
