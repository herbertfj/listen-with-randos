package listenwithrandos.app

import react.RBuilder
import react.dom.div
import react.router.dom.route

fun RBuilder.app() {
    div {
        navbar()

        div(classes = "container") {
            route("/", exact = true) {
                connectedLoginSwitch {
                    attrs {
                        loggedInRender = { child(ChatWindow::class) {} }
                        loggedOutRender = {}
                    }
                }
            }

            route("/receive", ReceiveToken::class)
        }
    }
}