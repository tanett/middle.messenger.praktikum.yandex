import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }

}) as { default: typeof BlockType };

describe('Block', () => {

  class ComponentMock extends Block {

    static getContent():HTMLElement {
      return  null
    }
  }

  it('should fire init event on initialization',  () => {
    new ComponentMock('Component',{});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });



  it('should return content ', () =>{
    new ComponentMock('Component',{});
    expect(ComponentMock!.getContent()).to.eql(null)
  })
});
