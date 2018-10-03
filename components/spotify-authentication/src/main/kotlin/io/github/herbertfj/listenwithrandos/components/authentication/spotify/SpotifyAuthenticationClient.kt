package io.github.herbertfj.listenwithrandos.components.authentication.spotify

import com.fasterxml.jackson.annotation.JsonProperty
import io.github.herbertfj.listenwithrandos.components.authentication.AuthenticationClient
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import org.springframework.web.util.UriComponentsBuilder
import reactor.core.publisher.Mono
import java.util.*

class SpotifyAuthenticationClient(val webClient: WebClient,
                                  val spotifyConfig: SpotifyConfig) : AuthenticationClient {

    override fun getBearerToken(): Mono<String> {
        val uri = UriComponentsBuilder.fromUriString("https://accounts.spotify.com")
            .pathSegment("api", "token")
            .build()
            .toUri()

        val map = LinkedMultiValueMap<String, String>()
        map.add("grant_type", "client_credentials")

        return webClient.post()
            .uri(uri)
            .syncBody(map)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .header(HttpHeaders.AUTHORIZATION, "Basic " + getAuthorizationHeaders())
            .retrieve()
            .bodyToMono<ClientCredentialsResponse>()
            .map { it.accessToken }
    }

    private fun getAuthorizationHeaders() = Base64.getEncoder()
            .encodeToString("${spotifyConfig.clientId}:${spotifyConfig.clientSecret}".toByteArray())

    data class ClientCredentialsResponse(
        @JsonProperty("access_token") val accessToken: String,
        @JsonProperty("token_type") val tokenType: String,
        @JsonProperty("expires_in") val expiresIn: Int
    )
}
