import { expect } from 'chai';
import { isEqual, isEqualString } from './isEqual'


describe('isEqual',()=>{

  it('return true for equal obj', ()=>{
    const obj1={key: 'value'}
    const obj2={key: 'value'}

    expect(isEqual(obj1, obj2)).to.be.true
  })
  it('return false for not eql obj', ()=>{
    const obj1={key: 'value', key2: 'value2'}
    const obj2={key: 'value'}
    expect(isEqual(obj1, obj2)).to.be.false
  })
  it('return false for not a obj', ()=>{
    const obj1={key: []}
    const obj2={key: 'value'}
    expect(isEqual(obj1, obj2)).to.be.false
  })

})

describe('isEqualString',()=>{

  it('return true for equal str', ()=>{
    const str1='value'
    const str2='value'

    expect(isEqualString(str1, str2)).to.be.true
  })
  it('return false for not eql str', ()=>{
    const str1='value'
    const str2=''
    expect(isEqualString(str1, str2)).to.be.false
  })
  

})
