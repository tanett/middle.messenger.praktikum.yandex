import { expect } from 'chai'
import { Button } from './button'
import sinon from 'sinon'

describe('Button', () => {

  it('should render', () => {
    new Button({
                 classNames: '', id: '1', onClick(e: Event): void {
      }, text: '1', type: 'button',
               })
  })

  it('element should return button', () => {
    const btn = new Button({
                             classNames: '', id: '1', onClick(e: Event): void {
      }, text: '1', type: 'button',
                           })
    const element = btn.element

    expect(element).to.be.instanceof(window.HTMLButtonElement)
  })

})
