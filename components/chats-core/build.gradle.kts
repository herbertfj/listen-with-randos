dependencies {
    implementation(project(":components:users"))
    implementation("io.projectreactor:reactor-core")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test")
}
