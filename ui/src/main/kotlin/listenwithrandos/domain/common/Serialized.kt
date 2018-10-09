package listenwithrandos.domain.common

typealias DataClasser<T> = (dynamic: dynamic) -> T

typealias DataUnclasser<T> = (data: T) -> dynamic

fun <T> arrayClasser(classer: DataClasser<T>): DataClasser<Array<T>> {
    return { data ->
        var classed = arrayOf<T>()
        (data as Array<dynamic>).forEach {
            classed += classer(it)
        }
        classed
    }
}
