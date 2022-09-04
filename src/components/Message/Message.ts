
import './style.css'
import Block from '../../utils/Block';
import MessageTmpl from './Message.hbs'

interface IMessage {
    id:string,text: string, image: string, date: string,checkRead: boolean, classNames: string
}

export class Message extends Block {
    constructor(props: IMessage) {
        super('Message', props);
    }


render(): any {

    return this.compile(MessageTmpl, {
        ...this.props, classNamesDate:(!!this.props.text ? 'messageItem__date_text ' :'messageItem__date_image'),
        children: this.children,
    })
}

}
