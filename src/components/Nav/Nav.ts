import Block from '../../utils/Block';
// @ts-ignore
import * as styles from './styles.css';


import NavTmpl  from './NavTmpl.hbs';


interface INav  { items: { url: string, title: string }[], events: { [key: string]: (events: Event) => void }}

export class Nav extends Block {

    constructor(props: INav) {
        super('Nav', props);
    }


    render(): any {

        return this.compile(NavTmpl,{
            items: this.props.items, styles: styles
        })
    }
}
