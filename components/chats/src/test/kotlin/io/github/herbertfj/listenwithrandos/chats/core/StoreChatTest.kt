package io.github.herbertfj.listenwithrandos.chats.core

import io.github.herbertfj.listenwithrandos.components.users.User
import io.github.herbertfj.listenwithrandos.components.users.UserRepository
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mockito.mock
import reactor.core.publisher.Mono.just
import reactor.test.StepVerifier
import java.time.Instant

class StoreChatTest {

    lateinit var storeChat: StoreChat
    lateinit var chatRepository: ChatRepository
    lateinit var userRepository: UserRepository

    @BeforeEach
    fun setUp() {
        chatRepository = mock(ChatRepository::class.java)
        userRepository = mock(UserRepository::class.java)
        storeChat = StoreChat(chatRepository, userRepository)
    }

    @Test
    fun `finds the user and stores it with the message`() {
        val chatMessage = ChatMessage("message", Instant.now(), "userId")
        val user = User("userId", "spotifyId", "displayName")
        val chatToSave = Chat(
            message = chatMessage.message,
            time = chatMessage.time,
            user = ChatUser(chatMessage.userId, user.displayName)
        )
        val expectedChat = chatToSave.copy(id = "chatId")

        given(userRepository.find(chatMessage.userId)).willReturn(just(user))
        given(chatRepository.add(chatToSave)).willReturn(just(expectedChat))

        val storedChat = storeChat(chatMessage)

        StepVerifier.create(storedChat)
                .expectNext(expectedChat)
                .verifyComplete()
    }
}
