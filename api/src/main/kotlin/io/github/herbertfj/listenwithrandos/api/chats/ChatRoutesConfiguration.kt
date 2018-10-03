package io.github.herbertfj.listenwithrandos.api.chats

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.web.reactive.function.server.router

@Configuration
class ChatRoutesConfiguration {
    @Bean
    fun chatRoutes(chatHandler: ChatHandler) = router {
        path("/api/chats").nest {
            method(HttpMethod.POST, chatHandler::saveChat)
            method(HttpMethod.GET, chatHandler::getChats)

            GET("/new", chatHandler::generateRandom)
        }
    }
}
