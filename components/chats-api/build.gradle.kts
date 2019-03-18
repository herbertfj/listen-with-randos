dependencies {
    implementation(project(":components:chats-core"))
    implementation(project(":components:users-core"))
    implementation(project(":components:mongo-chats"))
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
}