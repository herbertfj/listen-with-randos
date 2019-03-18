package io.github.herbertfj.listenwithrandos.chats.core

import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface ChatRepository {
    fun add(chat: Chat): Mono<Chat>
    fun getRecent(): Flux<Chat>
}
