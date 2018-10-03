package listenwithrandos.common

import kotlinext.js.js

fun parseSearch(string: String): dynamic {
    return qs.parse(string, js { this["ignoreQueryPrefix"] = true } as Any)
}
