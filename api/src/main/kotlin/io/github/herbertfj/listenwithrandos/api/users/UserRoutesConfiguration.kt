package io.github.herbertfj.listenwithrandos.api.users

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.router

@Configuration
class UserRoutesConfiguration {

    @Bean
    fun userRoutes(userHandler: UserHandler) = router {
        path("/api/users").nest {
            GET("/", userHandler::findUser)
            POST("/", userHandler::createUser)
        }
    }
}
