export const taskReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_SUCCESS":
      return {
        ...state,
        tasks: payload,
        tasksLoading: false,
      };

    case "LOAD_FAILED":
      return {
        ...state,
        tasks: [],
        tasksLoading: false,
      };

    default:
      return state;
  }
};
