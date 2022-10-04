import Block from '../../utils/Block'
import PopupTmpl from './PopupTmpl.hbs'
import './style.css'
import InputTextValidate from '../../components/InputTextValidate'

import ChatsController from '../../controllers/ChatsController'
import { inputRules } from '../../utils/validationRules'
import store from '../../utils/Store'


interface IPopup {
  title: string;
  placeholder: string
  label: string
  openPopup: boolean;
  closePopup: (e: Event) => void
  onSaveNewChat: (e: Event) => void
  forUser?: boolean

}

export class Popup extends Block<IPopup> {
  static componentName: string = 'Popup'

  constructor(props: IPopup) {
    super('Popup', props)
  }

  async onSaveDataClick(e: Event) {
    e.preventDefault()

    const inputs = {
      chatTitle: '',
      isValid: true,
    }
    Object.values(this.children).forEach(child => {
      // @ts-ignore
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as unknown as InputTextValidate ).getValue()
        inputs.isValid = ( child as unknown as InputTextValidate ).isValid()

      }
    })
    if (inputs.isValid) {

      // @ts-ignore
      await ChatsController.createChat(inputs.chatTitle).catch(error => console.log(error))

      await ChatsController.getChats().catch(error => console.log(error))
      this.props.closePopup(e)
    }

  }

  async onSaveUserHandler(e: Event) {
    e.preventDefault()

    const inputs = {
      chatTitle: '',
      isValid: true,
    }
    Object.values(this.children).forEach(child => {
      // @ts-ignore
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as unknown as InputTextValidate ).getValue()
        inputs.isValid = ( child as unknown as InputTextValidate ).isValid()

      }
    })
    const activeChat = store.getState().activeChatId
    if (inputs.isValid && activeChat) {
      const activeChat = store.getState().activeChatId
      // @ts-ignore
      await ChatsController.addUserToChatController(inputs.chatTitle, activeChat).catch(error => console.log(error))
      this.props.closePopup(e)
    } else { return}
  }

  render() {
    const { title, placeholder, label, openPopup, closePopup } = this.props
    return this.compile(PopupTmpl, {
      title, openPopup, closePopup, placeholder,
      onCloseClick: ( (e: Event) => closePopup(e) ).bind(this),
      titlePattern: inputRules.titleChat,
      errorMessage: 'Поле не должно быть пустым',
      onSaveClick: this.props.forUser ? (e: Event) => this.onSaveUserHandler(e) : (e: Event) => this.onSaveDataClick(e),
      children: this.children,
    })
  }
}
