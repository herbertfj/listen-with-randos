package listenwithrandos.domain.common

interface DataClasser<T> {
    operator fun invoke(dynamic: dynamic): T
}

interface DataUnclasser<T> {
    operator fun invoke(data: T): dynamic
}
