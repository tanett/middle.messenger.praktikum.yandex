import Block from '../../utils/Block'
import PopupTmpl from './UsersListPopupTmpl.hbs'
import styles from './style.css'
import { User } from '../../api/UserAPI'



interface IPopupUsers {
  title: string;
  list: User[]
  isOpenPopup: boolean;
  closePopupClick: (e: Event) => void
}

export class UsersListPopup extends Block<IPopupUsers> {
  static componentName: string = 'UsersListPopup'

  constructor(props: IPopupUsers) {
    super('UsersListPopup', props)

  }

  render() {


    const { title, list, isOpenPopup, closePopupClick } = this.props
    return this.compile(PopupTmpl, {
      title, list, isOpenPopup, closePopupClick,
      onCloseClick: (e: Event) => closePopupClick(e),
      children: this.children,
      styles
    })
  }
}
