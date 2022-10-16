import Block from './Block'


import * as Handlebars from 'handlebars/runtime'

export function helperRegisterComponent(Component: typeof Block) {
  Handlebars.registerHelper(
    // @ts-ignore
    Component.componentName || Component.name,
    // @ts-ignore
    ({ data, fn, hash }) => {
      const component = new Component(hash)
      if (!data.root.children) {
        data.root.children = {}
      }
      data.root.children[component.id] = component
      return `<div data-id='${ component.id }'></div>`
    },
  )
}
