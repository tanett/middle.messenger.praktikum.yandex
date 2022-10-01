import Block from '../../utils/Block'
import PopupTmpl from './PopupTmpl.hbs'
import './style.css'
import InputTextValidate from '../../components/InputTextValidate'

import ChatsController from '../../controllers/ChatsController'
import { inputRules } from '../../utils/validationRules'


interface IPopup {
  title: string;
  openPopup: boolean;
  closePopup: (e: Event) => void
  onSaveNewChat:(e: Event) => void

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
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as unknown as InputTextValidate ).getValue()
        inputs.isValid = ( child as unknown as InputTextValidate ).isValid()

      }
    })
    if (inputs.isValid) {

      // @ts-ignore
   await   ChatsController.createChat(inputs.chatTitle).catch(error => console.log(error))

    await  ChatsController.getChats().catch(error => console.log(error))
      this.props.closePopup(e)
    }

  }

  render() {
    const { title, openPopup, closePopup } = this.props
    return this.compile(PopupTmpl, {
      title, openPopup, closePopup,
      onCloseClick: ( (e: Event) => closePopup(e) ).bind(this),
      titlePattern: inputRules.titleChat,
      errorMessage: "Поле не должно быть пустым",
      onSaveClick: (e: Event) => this.onSaveDataClick(e),
      children: this.children,
    })
  }
}
