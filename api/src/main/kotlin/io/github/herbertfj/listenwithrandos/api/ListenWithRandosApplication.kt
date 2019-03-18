package io.github.herbertfj.listenwithrandos.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["io.github.herbertfj.listenwithrandos"])
class ListenWithRandosApplication

fun main(args: Array<String>) {
    runApplication<ListenWithRandosApplication>(*args)
}
