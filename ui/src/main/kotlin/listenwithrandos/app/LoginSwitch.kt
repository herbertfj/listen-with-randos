package listenwithrandos.app

import listenwithrandos.state.State
import react.*
import react.redux.rConnect

interface LoginSwitchStateProps : RProps {
    var isLoggedIn: Boolean
}

interface LoginSwitchOwnProps : RProps {
    var loggedInRender: RBuilder.() -> Unit
    var loggedOutRender: RBuilder.() -> Unit
}

interface LoginSwitchProps : LoginSwitchStateProps, LoginSwitchOwnProps

class LoginSwitch : RComponent<LoginSwitchProps, RState>() {
    override fun RBuilder.render() {
        if (props.isLoggedIn)
            props.loggedInRender(this)
        else
            props.loggedOutRender(this)
    }
}

fun isLoggedIn(state: State): Boolean = state.accessToken != null

val connectedLoginSwitch = rConnect<State, LoginSwitchOwnProps, LoginSwitchProps>(
    mapStateToProps = { state, _ ->
        isLoggedIn = isLoggedIn(state)
    }
)(LoginSwitch::class.js.unsafeCast<RClass<LoginSwitchProps>>())
