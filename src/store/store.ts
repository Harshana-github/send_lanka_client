import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import catalogReducer from "./catalogSlice";
import deliveryReducer from "./deliverySlice";
import ordersReducer from "./ordersSlice";
import preferencesReducer from "./preferencesSlice";
import reviewsReducer from "./reviewsSlice";

// Combined once at module load: combineReducers probes reducers with a random action type,
// and doing that during render would break Cache Components prerendering.
const rootReducer = combineReducers({
  cart: cartReducer,
  catalog: catalogReducer,
  delivery: deliveryReducer,
  preferences: preferencesReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
});

export function makeStore() {
  return configureStore({ reducer: rootReducer });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
