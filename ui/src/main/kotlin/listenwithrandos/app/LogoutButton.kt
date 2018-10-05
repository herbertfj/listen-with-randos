package listenwithrandos.app

import kotlinx.html.ButtonType.button
import kotlinx.html.js.onClickFunction
import listenwithrandos.state.AppAction
import listenwithrandos.state.LogoutAction
import react.*
import react.dom.button
import react.redux.rConnect
import redux.WrapperAction

interface LogoutButtonDispatchProps: RProps {
    var logOut: () -> Unit
}

interface LogoutButtonProps: LogoutButtonDispatchProps

class LogoutButton: RComponent<LogoutButtonProps, RState>() {
    override fun RBuilder.render() {
        button(type = button, classes = "btn btn-link nav-link") {
            attrs.onClickFunction = { props.logOut() }

            +"Log Out"
        }
    }
}

val connectedLogoutButton = rConnect<AppAction, WrapperAction, RProps, LogoutButtonDispatchProps>(
    mapDispatchToProps = { dispatch, _ ->
        logOut = { dispatch(LogoutAction) }
    }
)(LogoutButton::class.js.unsafeCast<RClass<RProps>>())
