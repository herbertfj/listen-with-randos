package io.github.herbertfj.listenwithrandos.components.users

import reactor.core.publisher.Mono

interface UserRepository {
    fun create(user: User): Mono<User>
    fun find(spotifyId: String): Mono<User>
}
