import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension
import org.jetbrains.kotlin.gradle.dsl.KotlinJvmCompile

val springBootVersion: String by rootProject.extra
val junitJupiterVersion: String by rootProject.extra

subprojects {
    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jetbrains.kotlin.plugin.spring")
    apply(plugin = "io.spring.dependency-management")

    group = "io.github.herbertfj.listenwithrandos"
    version = "0.0.1-SNAPSHOT"

    tasks.withType<KotlinJvmCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "1.8"
        }
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }

    dependencies {
        "implementation"("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
        "testImplementation"("org.jetbrains.kotlin:kotlin-reflect")
        "testImplementation"("org.junit.jupiter:junit-jupiter:$junitJupiterVersion")
    }

    configure<DependencyManagementExtension> {
        imports {
            mavenBom("org.springframework.boot:spring-boot-dependencies:$springBootVersion")
        }
    }
}
