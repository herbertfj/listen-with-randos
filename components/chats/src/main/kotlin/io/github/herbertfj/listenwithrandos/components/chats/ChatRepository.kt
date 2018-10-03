package io.github.herbertfj.listenwithrandos.components.chats

import reactor.core.publisher.Mono

interface ChatRepository {
    fun add(chat: Chat): Mono<Chat>
}
