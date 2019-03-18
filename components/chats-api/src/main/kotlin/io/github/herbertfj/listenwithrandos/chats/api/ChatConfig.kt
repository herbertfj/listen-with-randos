package io.github.herbertfj.listenwithrandos.chats.api

import io.github.herbertfj.listenwithrandos.chats.core.ChatRepository
import io.github.herbertfj.listenwithrandos.chats.core.StoreChat
import io.github.herbertfj.listenwithrandos.users.core.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ChatConfig(val chatRepository: ChatRepository,
                 val userRepository: UserRepository) {

    @Bean
    fun storeChat() = StoreChat(chatRepository, userRepository)

}
