package listenwithrandos.app

import react.RBuilder
import react.dom.a
import listenwithrandos.environmentConfig

private val spotifyParams = qs.stringify(kotlinext.js.js {
    this["client_id"] = environmentConfig.spotifyClientId
    this["response_type"] = "token"
    this["redirect_uri"] = "http://localhost:8088/receive"
})

fun RBuilder.loginLink(classes: String? = null) {
    a(href = "https://accounts.spotify.com/authorize?$spotifyParams", classes = classes) {
        +"Sign in"
    }
}
