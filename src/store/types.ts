import Prize from "../models/Prize";
import { Action } from "redux";

export const SET_PRIZES = "SET_PRIZES";
export const SET_ACTIVE_PRIZE = "SET_ACTIVE_PRIZE";
export const CLEAR_ACTIVE_PRIZE = "CLEAR_ACTIVE_PRIZE";

interface SetPrizesAction extends Action<typeof SET_PRIZES> {
  prizes: Prize[];
}

interface SetActivePrizeAction extends Action<typeof SET_ACTIVE_PRIZE> {
  activePrize?: Prize;
}

interface ClearActivePrizeAction extends Action<typeof CLEAR_ACTIVE_PRIZE> {}

export type PrizesAction =
  | SetPrizesAction
  | SetActivePrizeAction
  | ClearActivePrizeAction;
