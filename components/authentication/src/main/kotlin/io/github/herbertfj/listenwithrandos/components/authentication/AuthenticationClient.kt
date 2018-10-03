package io.github.herbertfj.listenwithrandos.components.authentication

import reactor.core.publisher.Mono

interface AuthenticationClient {
   fun getBearerToken(): Mono<String>
}
