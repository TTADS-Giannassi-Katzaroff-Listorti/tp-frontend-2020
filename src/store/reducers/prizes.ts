import { Reducer } from "redux";
import Prize from "../../models/Prize";
import { PrizeState } from "../actions";
import {
  CLEAR_ACTIVE_PRIZE,
  PrizesAction,
  SET_ACTIVE_PRIZE,
  SET_PRIZES,
} from "../types";

const prizesReducer: Reducer<PrizeState, PrizesAction> = (
  state: PrizeState = {},
  action: PrizesAction
): PrizeState => {
  if (action.type === SET_PRIZES) {
    return { ...state, prizes: action.prizes };
  }
  if (action.type === SET_ACTIVE_PRIZE) {
    return { ...state, activePrize: action.activePrize };
  }

  if (action.type === CLEAR_ACTIVE_PRIZE) {
    const { activePrize, ...newState } = state;
    return newState;
  }

  return state;
};
export { prizesReducer };
