
import Fieldset from './Fieldset.tmpl.hbs'
import InputText from '../InputText/InputText.js';
import './style.css'



export default function (inputList, classNames) {

    const fieldsList = inputList.map(item=>InputText(item.id,item.name,item.label,item.type, item.placeholder,item.errorMessage, item.disabled)).join('')

    return Fieldset({ fieldsList, classNames})
}
