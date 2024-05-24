import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ecommerceApi from "@services/ecommerce";
import authReducer from "./features/auth/authSlice";
import overlayableUIReducer from "./features/overlayableUI/overlayableUISlice";
import cartReducer from "./features/cart/cartSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import comparelistReducer from "./features/comparelist/comparelistSlice";
import productsReducer from "./features/products/productsSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart", "wishlist"],
// };
const comparelistPersistConfig = {
  key: "comparelist",
  storage,
  whitelist: ["items"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
  comparelist: persistReducer(comparelistPersistConfig, comparelistReducer),
  overlayableUI: overlayableUIReducer,
  [ecommerceApi.reducerPath]: ecommerceApi.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ecommerceApi.middleware),
});
setupListeners(store.dispatch);
const persistor = persistStore(store);
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { persistor, store };
export type { RootState, AppDispatch };
