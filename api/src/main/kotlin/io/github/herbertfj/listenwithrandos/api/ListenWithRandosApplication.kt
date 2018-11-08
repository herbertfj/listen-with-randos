package io.github.herbertfj.listenwithrandos.api

import io.github.herbertfj.listenwithrandos.components.chats.mongo.MongoChatsScan
import io.github.herbertfj.listenwithrandos.components.users.mongo.MongoUsersScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackageClasses = [
    ListenWithRandosApplication::class,
    MongoChatsScan::class,
    MongoUsersScan::class
])
class ListenWithRandosApplication

fun main(args: Array<String>) {
    runApplication<ListenWithRandosApplication>(*args)
}
