import { assert, expect } from 'chai'
import queryStringify from './queryStringify'

describe('queryStringify',()=>{
  it('return right string',()=>{
    expect(queryStringify({a:'b', c: 5})).to.be.eql('?a=b&c=5')
  })
  it('return error for arguments is not obj',()=>{
   expect(queryStringify('a',)).to.throw( Error,'Data must be object','Data must be object')
  })
})
