package io.github.herbertfj.listenwithrandos.users.api

import io.github.herbertfj.listenwithrandos.users.core.User
import io.github.herbertfj.listenwithrandos.users.core.UserRepository
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.notFound
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.bodyToMono
import reactor.core.publisher.Mono

@Component
class UserHandler(val userRepository: UserRepository) {

    fun findUser(request: ServerRequest) =
        Mono.justOrEmpty(request.queryParam("spotifyId"))
            .flatMap { userRepository.findBySpotifyId(it) }
            .flatMap { ok().syncBody(it) }
            .switchIfEmpty(notFound().build())

    fun createUser(request: ServerRequest) = request
        .bodyToMono<User>()
        .flatMap {
            userRepository.findBySpotifyId(it.spotifyId)
                .switchIfEmpty(userRepository.create(it))
        }
        .flatMap { ok().syncBody(it) }
}
