import { configureStore } from "@reduxjs/toolkit";

import stepperReducer from "./Regslice";
import studentReducer from "./studentSlice";
import generalReducer from "./generalSlice";
import authReducer from "./authSlice";
import agentReducer from "./agentSlice"
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    stepper: stepperReducer,
    student: studentReducer,
    general: generalReducer,
    auth: authReducer,
    agent: agentReducer,
    admin: adminReducer,
  },

  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), userIdMiddleware],
});
