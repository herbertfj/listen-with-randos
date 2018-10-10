package listenwithrandos.domain.common

typealias DataClasser<T> = (dynamic: dynamic) -> T

typealias DataUnclasser<T> = (data: T) -> dynamic

fun <T> listClasser(classer: DataClasser<T>): DataClasser<List<T>> {
    return { data ->
        (data as Array<dynamic>).map {
            classer(it)
        }
    }
}
