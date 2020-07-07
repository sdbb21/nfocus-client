import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

import { selectUser } from "../../store/user/selectors";
import { apiUrl } from "../../config/constants";

export const saveScores = (data) => ({
  type: "FETCH_SCORES",
  payload: data,
});

export const getScores = () => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const scores = await axios.get(`${apiUrl}/scores`);
    dispatch(saveScores(scores.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e);
  }
};

const scoreSuccess = (postedScore) => {
  return {
    type: "SCORE_SUCCESS",
    payload: postedScore,
  };
};

export const postScore = (score, userId) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/scores/`,
        {
          score,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(scoreSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Score Posted"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
