import MessageTmpl from './Message.hbs'
import './style.css'



export default function (id,text, image, date,checkRead, classNames){

    return MessageTmpl({id, text, image, date , classNames,checkRead, classNamesDate:(!!text ? 'messageItem__date_text ' :'messageItem__date_image') })
}
