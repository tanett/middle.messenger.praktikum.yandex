import { EventBus } from './EventBus'
import { set } from './helpers/set'
import Block from './Block'
import { User } from '../api/UserAPI'
import { IChats } from '../api/ChatsAPI'
import { Message } from '../controllers/MessageController'

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User;
  chats: IChats[];
  messages: Record<number, Message[]>;
  activeChatId?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {

    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){
    let previousState: any;


    return class WithStore extends Component {

      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    }

  }

}

export default store;
