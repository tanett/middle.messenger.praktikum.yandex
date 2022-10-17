import { expect } from 'chai';
import {merge} from './merge'

describe('merge obj', ()=>{
  it('return merged obj',()=>{
    const obj1= {a:'b'}
      const obj2= {c: 'd'}
    expect(merge(obj1, obj2)).to.be.eql({a:'b',c:'d'})
  })
  it('return merged obj with nested obj',()=>{
    const obj1= {a:'b'}
    const obj2= {c: { e: ['l'] }}
    expect(merge(obj1, obj2)).to.be.eql({ a: 'b', c: { e: [ 'l' ] } })
  })
})
