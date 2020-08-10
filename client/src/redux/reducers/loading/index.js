export const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'REQUEST' // Returns true only on REQUEST state
  };
};

export const loadingSelector = actions => state =>
  actions.some(action => state.loading[action]);
