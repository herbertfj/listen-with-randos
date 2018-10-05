package listenwithrandos.app

import react.RBuilder
import react.dom.div
import react.dom.li
import react.dom.nav
import react.dom.ul
import react.router.dom.routeLink

fun RBuilder.navbar() {
    nav(classes = "navbar") {
        div(classes = "container") {
            routeLink(to = "/", className = "navbar-brand") {
                +"Listen With Randos"
            }

            ul(classes = "navbar-nav") {
                connectedLoginSwitch {
                    attrs {
                        loggedInRender = {
                            li(classes = "nav-item active") {
                                connectedLogoutButton {}
                            }
                        }
                        loggedOutRender = {
                            li(classes = "nav-item active") {
                                loginLink(classes = "nav-link")
                            }
                        }
                    }
                }
            }
        }
    }
}
