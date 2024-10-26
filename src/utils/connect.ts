import { Block } from './Block.ts';
import store, { IStoreState, StoreEvents } from '../store/Store.ts';
import { isEqual } from './isEqual.ts';
import { Indexed } from '../types/indexed.ts';

function connect(mapStateToProps: (state: IStoreState) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState() as IStoreState);
        console.log(state, 'previousState');
        super({ ...props, ...state });

        store.on(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            console.log(newState, 'newState');
          }

          state = newState;
        });
      }
    };
  };
}

export default connect;
