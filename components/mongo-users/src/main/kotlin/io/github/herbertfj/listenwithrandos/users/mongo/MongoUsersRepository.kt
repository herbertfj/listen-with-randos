package io.github.herbertfj.listenwithrandos.users.mongo

import io.github.herbertfj.listenwithrandos.users.core.User
import io.github.herbertfj.listenwithrandos.users.core.UserRepository
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.findById
import org.springframework.data.mongodb.core.findOne
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
class MongoUserRepository(private val mongoTemplate: ReactiveMongoTemplate): UserRepository {

    override fun find(id: String): Mono<User> {
        return mongoTemplate.findById(id)
    }

    override fun create(user: User): Mono<User> {
        return mongoTemplate.insert(user)
    }

    override fun findBySpotifyId(spotifyId: String): Mono<User> {
        return mongoTemplate.findOne(
            Query(where("spotifyId").isEqualTo(spotifyId))
        )
    }
}
