package listenwithrandos.common

import org.w3c.fetch.*
import kotlin.browser.window
import kotlin.js.Promise
import kotlinx.serialization.json.JSON
import kotlinx.serialization.serializer
import kotlin.reflect.KClass

data class FetchException(val method: String, val status: Short) :
    Exception(message = "$method failed with status: $status")

fun <T : Any> fetch(url: String, init: RequestInit? = null, clazz: KClass<T>): Promise<T> {
    val requestInit = RequestInit(
        method = init?.method ?: "GET",
        mode = init?.mode ?: RequestMode.SAME_ORIGIN,
        cache = init?.cache ?: RequestCache.DEFAULT,
        redirect = init?.redirect ?: RequestRedirect.FOLLOW,
        integrity = init?.integrity ?: "",
        credentials = init?.credentials ?: RequestCredentials.OMIT,
        headers = init?.headers ?: Headers(),
        referrerPolicy = "no-referrer"
    )

    return window.fetch(url, requestInit)
        .then {
            if (it.ok) it
            else throw FetchException(requestInit.method ?: "Request", it.status)
        }
        .then { it.text() }
        .then { JSON.parse(clazz.serializer(), it) }
}

inline fun <reified T : Any> fetch(url: String, init: RequestInit? = null): Promise<T> =
    fetch(url, init, T::class)
