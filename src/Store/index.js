import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
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
import { configureStore } from "@reduxjs/toolkit";
import initialState from "@/Store/initialState";

import startup from "./Startup";
import intention from "./Intention";
import user from "./User";
import fileTransfer from "./FileTransfer";

const reducers = combineReducers({
  startup,
  intention,
  user,
  fileTransfer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = (state, action) => {
  // Handle special PURGE_STORE case, reset to default (does not remove local encryptionComponents)
  if (action.type === "PURGE_STORE") {
    state = initialState;
  }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require("redux-flipper").default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

const PurgeStore = () => {
  return {
    type: "PURGE_STORE",
  };
};

export { store, persistor, PurgeStore };
