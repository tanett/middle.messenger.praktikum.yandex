import styles from './style.css'
import Block from '../../utils/Block'
import MessageTmpl from './Message.hbs'

interface IMessage {
  id: number;
  text: string;
  image?: string;
  date: string;
  checkRead: boolean;
  classNames: string;
}

export class Message extends Block<IMessage> {
  static componentName: string='Message'
  constructor(props: IMessage) {
    super('Message', props)
  }

  render(): any {
    const classN =`${styles.messagesItem} ${styles[this.props.classNames]}`
    return this.compile(MessageTmpl, {
      ...this.props,
      classNames: classN,
      classNamesDate: !!this.props.text
        ? styles.messageItem__date_text
        : styles.messageItem__date_image,
      children: this.children,
      styles
    })
  }
}
