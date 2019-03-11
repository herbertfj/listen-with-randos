val kotlinVersion by extra("1.2.71")
val springBootVersion by extra("2.1.3.RELEASE")

plugins {
    id("org.springframework.boot") version "2.1.3.RELEASE" apply false
    id("org.jetbrains.kotlin.jvm") version "1.2.71" apply false
    id("org.jetbrains.kotlin.plugin.spring") version "1.2.71" apply false
}

subprojects {
    repositories {
        mavenCentral()
    }
}
