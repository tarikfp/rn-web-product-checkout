import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./products";

export const combinedReducers = combineReducers({
  products: productReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
