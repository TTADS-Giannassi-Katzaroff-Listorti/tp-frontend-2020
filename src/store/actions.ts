import {
  CLEAR_ACTIVE_PRIZE,
  PrizesAction,
  SET_ACTIVE_PRIZE,
  SET_PRIZES,
} from "./types";
import Prize from "../models/Prize";
import Axios, { AxiosResponse } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface PrizeState {
  prizes?: Prize[];
  activePrize?: Prize;
}

const setPrizes = (prizes: Prize[]): PrizesAction => {
  return {
    type: SET_PRIZES,
    prizes,
  };
};

const setActivePrize = (activePrize?: Prize): PrizesAction => {
  return {
    type: SET_ACTIVE_PRIZE,
    activePrize,
  };
};

const clearActivePrize = (): PrizesAction => {
  return {
    type: CLEAR_ACTIVE_PRIZE,
  };
};

const refreshPrizes = (
  partial?: string
): ThunkAction<void, PrizeState, unknown, Action<any>> => async (dispatch) => {
  let response: AxiosResponse<any>;
  if (partial) {
    response = await Axios.get(
      `https://puntos.fkatz.ar/v1/prizes/find-by-name/${partial}`
    );
  } else {
    response = await Axios.get("https://puntos.fkatz.ar/v1/prizes");
  }
  dispatch(setPrizes(response.data));
};

const addPrize = (
  prize: Prize
): ThunkAction<void, PrizeState, unknown, Action<any>> => async (dispatch) => {
  await Axios.post("https://puntos.fkatz.ar/v1/prizes", prize);
};

const deletePrize = (
  prize: Prize
): ThunkAction<void, PrizeState, unknown, Action<any>> => async (dispatch) => {
  await Axios.delete(`https://puntos.fkatz.ar/v1/prizes/${prize.id}`);
};

const updatePrize = (
  prize: Prize
): ThunkAction<void, PrizeState, unknown, Action<any>> => async (dispatch) => {
  await Axios.put(`https://puntos.fkatz.ar/v1/prizes/${prize.id}`, prize);
};

const getActivePrize = (
  prize: Prize
): ThunkAction<void, PrizeState, unknown, Action<any>> => async (dispatch) => {
  const response = await Axios.get(
    `https://puntos.fkatz.ar/v1/prizes/${prize.id}`
  );
  dispatch(setActivePrize(response.data));
};

const Actions = {
  addPrize,
  deletePrize,
  updatePrize,
  refreshPrizes,
  getActivePrize,
  clearActivePrize,
};
export default Actions;
