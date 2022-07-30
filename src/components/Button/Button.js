
import ByttonTmpl from './Button.tmpl.hbs'
import './style.css'



export default function (text, classNames, type,id){

    return ByttonTmpl({ text , classNames, type, id})
}
