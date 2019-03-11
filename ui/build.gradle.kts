tasks.register<Exec>("bootRun") {
    group = "application"
    commandLine = listOf("npm", "start")
}

tasks.register<Exec>("install") {
    group = "build"
    commandLine = listOf("npm", "install")
}

tasks.register<Exec>("test") {
    group = "verification"
    commandLine = listOf("npm", "test")

    environment(mapOf(
        "CI" to "true"
    ))
}

tasks.register<Exec>("build") {
    group = "build"
    commandLine = listOf("npm", "run", "build")
    dependsOn("install", "test")
}
