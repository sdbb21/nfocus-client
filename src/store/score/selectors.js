export const selectScores = (state) => state.score;

export const selectScoresByUserId = (id) => (state) => {
  return state.score.filter((sc) => sc.userId === id);
};
