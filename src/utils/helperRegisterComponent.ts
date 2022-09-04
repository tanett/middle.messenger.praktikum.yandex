import Block from './Block';
// @ts-ignore
import * as Handlebars from 'handlebars/dist/handlebars.runtime';

export function helperRegisterComponent( Component: typeof Block) {


    // @ts-ignore
    Handlebars.registerHelper( Component.componentName || Component.name, ( { data, fn, hash }) => {

        const component = new Component(hash)
    if(!data.root.children){
        data.root.children = {}
    }
        data.root.children[component.id] = component

        return  `<div data-id="${component.id}"></div>`
    })
}
