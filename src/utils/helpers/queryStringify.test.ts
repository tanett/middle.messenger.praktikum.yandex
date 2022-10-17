import { assert, expect } from 'chai'
import queryStringify from './queryStringify'

describe('queryStringify',()=>{
  it('return right string',()=>{
    expect(queryStringify({a:'b', c: 5})).to.be.eql('?a=b&c=5')
  })

})
