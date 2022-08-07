import InputTextProfileTmpl from './InputTextProfile.hbs'
import './style.css'



export default function (id, name ,label, type, placeholder, errorMessage,disabled ) {

    const input = InputTextProfileTmpl({ id, name ,label, type, placeholder, errorMessage, disabled})


    return input
}
