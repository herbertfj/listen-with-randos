package io.github.herbertfj.listenwithrandos.components.chats

import io.github.herbertfj.listenwithrandos.components.users.UserRepository
import reactor.core.publisher.Mono
import java.time.Instant

data class ChatMessage(val message: String, val time: Instant, val userId: String)

class StoreChat(private val chatRepository: ChatRepository,
                private val userRepository: UserRepository) {

    operator fun invoke(message: ChatMessage): Mono<Chat> {
        return userRepository.find(message.userId)
            .map {
                Chat(
                    message = message.message,
                    time = message.time,
                    user = ChatUser(id = it.id!!, displayName = it.displayName)
                )
            }
            .flatMap { chatRepository.add(it) }
    }
}
