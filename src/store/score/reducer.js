const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_SCORES":
      return [...payload];

    case "SCORE_SUCCESS":
      return {
        ...state,
        score: { ...payload },
      };

    default:
      return state;
  }
};
