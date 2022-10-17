import BtnLinkTmpl from './BtnLinkTmpl.hbs'
import styles from './style.css'
import Block from '../../utils/Block'

interface IButtonLink {
  id: string;
  text: string;
  classNames: string;
  onClick: () => void;
}

export class ButtonLink extends Block<IButtonLink> {
  static componentName: string='ButtonLink'
  constructor(props: IButtonLink) {
    super('ButtonLink', {
      text: props.text,
      classNames: props.classNames,
      id: props.id,
      events: {
        click: props.onClick,
      },
    })
  }

  render() {
    const { id, text, classNames, onClick } = this.props
    const classN = styles[this.props.classNames]
    return this.compile(BtnLinkTmpl, { id, text, classNames:  `${styles.buttonLink} ${classN}`, onClick, styles })
  }
}
