package listenwithrandos.app

import kotlinx.html.ButtonType.submit
import kotlinx.html.InputType.text
import kotlinx.html.js.onChangeFunction
import kotlinx.html.js.onSubmitFunction
import listenwithrandos.state.AppAction
import listenwithrandos.state.State
import org.w3c.dom.HTMLInputElement
import react.*
import react.dom.*
import react.redux.rConnect
import redux.WrapperAction

interface ChatWindowStateProps: RProps {
    var chats: Array<String>?
}

interface ChatWindowDispatchProps: RProps {
    var submitChat: (String) -> Unit
}

interface ChatWindowProps: ChatWindowStateProps, ChatWindowDispatchProps

interface ChatWindowState : RState {
    var newChat: String
}

class ChatWindow : RComponent<ChatWindowProps, ChatWindowState>() {
    override fun ChatWindowState.init() {
        newChat = ""
    }

    override fun RBuilder.render() {
        div {
            h1 { +"Chats" }

            props.chats?.forEach { chat ->
                p { +"Me: $chat" }
            }
        }

        form {
            attrs.onSubmitFunction = { event ->
                event.preventDefault()

                setState {
                    newChat = ""
                }
            }

            div(classes = "input-group") {
                input(type = text, classes = "form-control") {
                    attrs.value = state.newChat
                    attrs.onChangeFunction = { event ->
                        val target = event.target as HTMLInputElement

                        setState {
                            newChat = target.value
                        }
                    }
                }

                div(classes = "input-group-append") {
                    button(type = submit, classes = "btn btn-primary") {
                        +"Send"
                    }
                }
            }
        }
    }
}

fun submitChat(dispatch: (AppAction) -> WrapperAction) {

}

val connectedChatWindow = rConnect<State, AppAction, WrapperAction, RProps, ChatWindowStateProps, ChatWindowDispatchProps, ChatWindowProps>(
    mapStateToProps = { state, _ ->
        chats = arrayOf()
    },
    mapDispatchToProps = { dispatch, _ ->
    }
)(ChatWindow::class.js.unsafeCast<RClass<RProps>>())
