package io.github.herbertfj.listenwithrandos.chats.mongo

import io.github.herbertfj.listenwithrandos.chats.core.Chat
import io.github.herbertfj.listenwithrandos.chats.core.ChatRepository
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.Instant
import java.time.temporal.ChronoUnit

private val recentQuery = Query(
    where("time").gte(Instant.now().minus(24, ChronoUnit.HOURS))
)

@Repository
class MongoChatRepository(private val mongoTemplate: ReactiveMongoTemplate): ChatRepository {
    override fun getRecent(): Flux<Chat> {
        return mongoTemplate.find(recentQuery, Chat::class.java)
    }

    override fun add(chat: Chat): Mono<Chat> {
        return mongoTemplate.insert(chat)
    }
}
