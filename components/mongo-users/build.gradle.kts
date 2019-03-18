dependencies {
    api(project(":components:users"))
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb-reactive")

    testImplementation("de.flapdoodle.embed:de.flapdoodle.embed.mongo")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
