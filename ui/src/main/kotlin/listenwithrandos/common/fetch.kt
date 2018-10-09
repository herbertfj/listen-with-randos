package listenwithrandos.common

import org.w3c.fetch.*
import kotlin.browser.window
import kotlin.js.Promise

data class FetchException(val method: String, val status: Short) :
    Exception(message = "$method failed with status: $status")

fun <T> fetch(url: String, init: RequestInit? = null, classer: ((dynamic) -> T)? = null): Promise<T> {
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
        .then { it.json() }
        .then { classer?.invoke(it) ?: it.unsafeCast<T>() }
}
