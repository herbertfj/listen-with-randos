package listenwithrandos

import listenwithrandos.app.app
import listenwithrandos.state.createStore
import react.dom.render
import react.redux.provider
import react.router.dom.browserRouter
import kotlin.browser.document

@JsModule("styles.scss")
external val styles: String

fun main(args: Array<String>) {
    styles

    val store = createStore()

    render(document.getElementById("app")) {
        provider(store) {
            browserRouter {
                app()
            }
        }
    }
}
