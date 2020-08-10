export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]:
      requestState === 'FAILURE'
        ? {
            message: payload.message,
            statusCode: payload.response && payload.response.status
          }
        : {}
  };
};

export const errorMessageSelector = actions => state => {
  const errors = actions.map(action => state.error[action]);
  return errors && errors[0] ? errors[0] : '';
};
