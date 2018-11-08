package io.github.herbertfj.listenwithrandos.components.users.mongo

import io.github.herbertfj.listenwithrandos.components.users.User
import io.github.herbertfj.listenwithrandos.components.users.UserRepository
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.mongodb.core.findOne
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
class MongoUserRepository(val mongoTemplate: ReactiveMongoTemplate): UserRepository {

    override fun create(user: User): Mono<User> {
        return mongoTemplate.insert(user)
    }

    override fun find(spotifyId: String): Mono<User> {
        return mongoTemplate.findOne(
            Query(where("spotifyId").isEqualTo(spotifyId))
        )
    }
}
