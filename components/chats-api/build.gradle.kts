dependencies {
    implementation(project(":components:chats"))
    implementation(project(":components:users"))
    implementation(project(":components:mongo-chats"))
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
}