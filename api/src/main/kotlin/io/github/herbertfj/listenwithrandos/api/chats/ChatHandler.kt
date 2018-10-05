package io.github.herbertfj.listenwithrandos.api.chats

import io.github.herbertfj.listenwithrandos.components.chats.Chat
import io.github.herbertfj.listenwithrandos.components.chats.ChatRepository
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.bodyToMono
import java.time.Instant

@Component
class ChatHandler(val chatRepository: ChatRepository) {

    fun saveChat(request: ServerRequest) = request
        .bodyToMono<Chat>()
        .flatMap { chatRepository.add(it) }
        .flatMap { ok().syncBody(it) }

    fun getChats(request: ServerRequest) =
        ok().body(chatRepository.getRecent(), Chat::class.java)

    fun generateRandom(request: ServerRequest) = chatRepository
        .add(Chat(userId = "user", message = "wtf", time = Instant.now()))
        .flatMap { ok().syncBody(it) }

}
