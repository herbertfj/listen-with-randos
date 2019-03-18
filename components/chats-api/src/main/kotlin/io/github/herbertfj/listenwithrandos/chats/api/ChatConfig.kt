package io.github.herbertfj.listenwithrandos.chats.api

import io.github.herbertfj.listenwithrandos.components.chats.ChatRepository
import io.github.herbertfj.listenwithrandos.components.chats.StoreChat
import io.github.herbertfj.listenwithrandos.components.users.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ChatConfig(val chatRepository: ChatRepository,
                 val userRepository: UserRepository) {

    @Bean
    fun storeChat() = StoreChat(chatRepository, userRepository)

}
