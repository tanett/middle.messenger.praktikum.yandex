import { IndexLayout } from './layouts/indexLayout/IndexLayout'
// @ts-ignore
import components from './components/**/index.ts'

import { helperRegisterComponent } from './utils/helperRegisterComponent'

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  Object.values(components).forEach((component) => helperRegisterComponent(component.default))
  const root = document.querySelector('#root')!

  const homePage = new IndexLayout({ title: 'Page list' })

  root.append(homePage.getContent()!)

  homePage.dispatchComponentDidMount()
})
