package io.github.herbertfj.listenwithrandos.components.chats.mongo

import io.github.herbertfj.listenwithrandos.components.chats.Chat
import io.github.herbertfj.listenwithrandos.components.chats.ChatRepository
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
class MongoChatRepository(val mongoTemplate: ReactiveMongoTemplate): ChatRepository {
    override fun add(chat: Chat): Mono<Chat> {
        return mongoTemplate.insert(chat)
    }
}
