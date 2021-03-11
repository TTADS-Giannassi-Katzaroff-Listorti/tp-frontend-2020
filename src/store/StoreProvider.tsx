import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { prizesReducer } from "./reducers/prizes";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ prizes: prizesReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof rootReducer>;

export { StoreProvider };
