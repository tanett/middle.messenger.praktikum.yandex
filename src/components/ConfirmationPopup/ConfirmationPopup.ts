import Block from '../../utils/Block'
import PopupTmpl from './ConfirmationPopupTmpl.hbs'
import './style.css'
import ChatsController from '../../controllers/ChatsController'
import { inputRules } from '../../utils/validationRules'


interface IPopup {
  title: string;
  message: string
  isOpenPopup: boolean;
  closePopupClick: (e: Event) => void
  onSaveClick: (e: Event) => void


}

export class ConfirmationPopup extends Block<IPopup> {
  static componentName: string = 'ConfirmationPopup'

  constructor(props: IPopup) {
    super('ConfirmationPopup', props)
  }

  async onSaveClick(e: Event) {
    e.preventDefault()
    this.props.onSaveClick(e)
    await ChatsController.getChats().catch(error => console.log(error))
    this.props.closePopupClick(e)


  }


  render() {

    const { title, message, isOpenPopup, closePopupClick } = this.props
    return this.compile(PopupTmpl, {
      title, message, isOpenPopup, closePopupClick,
      onCloseClick:  (e: Event) => closePopupClick(e) ,
      onSaveClick: (e: Event) => this.onSaveClick(e),
      children: this.children,
    })
  }
}
