

export enum ActionReducer {
  INCREMENT = "INCREMENT",
}

interface CountAccion {
  type: ActionReducer;
}

interface CountState {
  count: number;
}

export default function reducer(state: CountState, action: CountAccion) {
  const { type} = action;
  switch (type) {
    case ActionReducer.INCREMENT:
      return { count: state.count + 1 };
  }
}
