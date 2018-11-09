package io.github.herbertfj.listenwithrandos.components.users.mongo

import io.github.herbertfj.listenwithrandos.components.users.User
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.NONE
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.dropCollection
import org.springframework.data.mongodb.core.findById
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = NONE)
class MongoUserRepositoryTest {

    @Autowired
    lateinit var mongoTemplate: ReactiveMongoTemplate

    @Autowired
    lateinit var mongoUserRepository: MongoUserRepository

    @Before
    fun setUp() {
        mongoTemplate.dropCollection<User>().block()
    }

    @Test
    fun `create stores a user`() {
        val user = User(spotifyId = "spotifyId", displayName = "displayName")

        val created = mongoUserRepository.create(user).block()

        val found = mongoTemplate.findById<User>(created!!.id!!).block()

        assertThat(created).isEqualTo(user.copy(id = created.id))
        assertThat(found).isEqualTo(created)
    }

    @Test
    fun `find finds a stored user by spotifyId`() {
        val created = mongoTemplate.insert(User(spotifyId = "spotifyId", displayName = "displayName")).block()

        val found = mongoUserRepository.findBySpotifyId(created!!.spotifyId).block()

        assertThat(found).isEqualTo(created)
    }
}

@SpringBootApplication
class MongoUserTestApp