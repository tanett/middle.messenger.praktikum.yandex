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
  forDeleteUser?: boolean

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

    let value:number[]=[]
    Object.values(this.children).forEach(child => {
      // @ts-ignore
      if (child.className === 'InputTextValidate') {
        value.push(+(( child as unknown as InputTextValidate ).getValue()))
         }
    })
    const activeChat = store.getState().activeChatId
    if (value.length>0 && activeChat) {
      await ChatsController.addUserToChatController(value, activeChat).catch(error => console.log(error))
      this.props.closePopup(e)
    } else { return}
  }

  async onDeleteUserHandler(e: Event) {
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


      await ChatsController.deleteUserToChatController([+inputs.chatTitle], activeChat).catch(error => console.log(error))
      this.props.closePopup(e)
    } else { return}
  }

  render() {

    const { title, placeholder, label, openPopup, closePopup } = this.props
    return this.compile(PopupTmpl, {
      title, openPopup, closePopup, placeholder,
      onCloseClick: ( (e: Event) => closePopup(e) ).bind(this),
      titlePattern: inputRules.anyNumber,
      errorMessage: 'Поле не должно быть пустым',
      onSaveClick: this.props.forUser ? (e: Event) => this.onSaveUserHandler(e) :  this.props.forDeleteUser ? (e: Event) => this.onDeleteUserHandler(e) :(e: Event) => this.onSaveDataClick(e),
      children: this.children,
    })
  }
}
