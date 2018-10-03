package listenwithrandos.app

import kotlinext.js.js
import kotlinx.html.classes
import qs.stringify
import react.RBuilder
import react.dom.a
import react.dom.div
import react.router.dom.route
import listenwithrandos.environmentConfig

fun RBuilder.app() {
    val params = stringify(js {
        this["client_id"] = environmentConfig.spotifyClientId
        this["response_type"] = "token"
        this["redirect_uri"] = "http://localhost:8088/receive"
    })

    div {
        attrs.classes = setOf("container")

        a(href = "https://accounts.spotify.com/authorize?$params") {
            +"Go sign in!"
        }

        route("/receive", ReceiveToken::class)
    }
}
