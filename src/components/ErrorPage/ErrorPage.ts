import Block from '../../utils/Block'
import ErrorPageTmpl from './ErrorPageTmpl.hbs'
import styles from './style.css'

interface IErrorPage {
  title: string;
  subTitle: string;
  link: string;
  linkText: string;
}

export class ErrorPage extends Block<IErrorPage> {
  static componentName: string='ErrorPage'
  constructor(props: IErrorPage) {
    super('errorPage', props)
  }

  render() {
    const { title, subTitle, link, linkText } = this.props
    return this.compile(ErrorPageTmpl, { title, subTitle, link, linkText, styles })
  }
}
