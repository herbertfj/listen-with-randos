dependencies {
    implementation(project(":components:users"))
    implementation(project(":components:mongo-users"))
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
}