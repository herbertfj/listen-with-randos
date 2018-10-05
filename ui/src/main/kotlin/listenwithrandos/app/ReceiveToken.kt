package listenwithrandos.app

import listenwithrandos.common.fetch
import listenwithrandos.state.AppAction
import listenwithrandos.state.KeepTokenAction
import org.w3c.fetch.CORS
import org.w3c.fetch.Headers
import org.w3c.fetch.RequestInit
import org.w3c.fetch.RequestMode
import react.*
import react.dom.div
import react.redux.rConnect
import react.router.dom.RouteResultHistory
import react.router.dom.RouteResultProps
import redux.WrapperAction

class ReceiveToken : RComponent<RouteResultProps<RProps>, RState>() {
    override fun RBuilder.render() {
        connectedKeepToken {
            attrs {
                token = qs.parse(props.location.hash.substringAfter('#')).access_token as String
                redirect = lambda@{
                    val history: dynamic = props.history
                    history.replace("/")
                    return@lambda
                }
            }
        }
    }
}

interface KeepTokenOwnProps : RProps {
    var token: String
    var redirect: () -> Unit
}

interface KeepTokenDispatchProps : RProps {
    var keep: (accessToken: String) -> Unit
}

interface KeepTokenProps : KeepTokenOwnProps, KeepTokenDispatchProps

external interface UserProfile {
    val display_name: String
    val id: String
    val images: dynamic
    val followers: dynamic
}

fun getProfile(token: String) {
    val headers = Headers()
    headers.append("Authorization", "Bearer $token")

    fetch<UserProfile>("https://api.spotify.com/v1/me", RequestInit(
        mode = RequestMode.CORS,
        headers = headers
    )).then {
        println(it.id)
        println(it.display_name)
        println(it.images[0].url as String)
        println(it.followers.total as Number)
    }
}

class KeepToken : RComponent<KeepTokenProps, RState>() {
    override fun componentDidMount() {
        props.keep(props.token)
        props.redirect()
    }

    override fun RBuilder.render() {
    }
}

val connectedKeepToken =
    rConnect<AppAction, WrapperAction, KeepTokenOwnProps, KeepTokenProps>(
        mapDispatchToProps = { dispatch, _ ->
            keep = {
                println("Yo, im boutta keep $it")
                dispatch(KeepTokenAction(it))
            }
        }
    )(KeepToken::class.js.unsafeCast<RClass<KeepTokenOwnProps>>())
