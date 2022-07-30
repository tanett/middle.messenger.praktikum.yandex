
import ErrorPageTmpl from './ErrorPage.hbs'
import './style.css'

export default function (title, subTitle, link, linkText) {

    return  ErrorPageTmpl({
        title,
        subTitle,
        link,
        linkText
    })
}
