import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import userSlice from "./reducers/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./reducers/cartSlice";

const userPersistConfig = {
  key: "users",
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
};

const userReducer = persistReducer(userPersistConfig, userSlice);
const cartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
