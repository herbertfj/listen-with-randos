package io.github.herbertfj.listenwithrandos.chats.api

import io.github.herbertfj.listenwithrandos.components.chats.ChatMessage
import io.github.herbertfj.listenwithrandos.components.chats.ChatRepository
import io.github.herbertfj.listenwithrandos.components.chats.StoreChat
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.body
import org.springframework.web.reactive.function.server.bodyToMono

@Component
class ChatHandler(val chatRepository: ChatRepository,
                  val storeChat: StoreChat) {

    fun saveChat(request: ServerRequest) = request
        .bodyToMono<ChatMessage>()
        .flatMap { storeChat(it) }
        .flatMap { ok().syncBody(it) }

    fun getChats(request: ServerRequest) =
        ok().body(chatRepository.getRecent())

}
