import Block from '../../utils/Block'
import './styles.css'

import NavTmpl from './NavTmpl.hbs'

interface INav {
  items: { url: string, title: string }[];
  events: { [key: string]: (events: Event) => void };
}

export class Nav extends Block<INav> {
  static componentName: string='Nav'
  constructor(props: INav) {
    super('Nav', props)
  }

  render(): any {
    return this.compile(NavTmpl, {
      items: this.props.items,
    })
  }
}
