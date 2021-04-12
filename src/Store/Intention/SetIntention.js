import { createAction } from "@reduxjs/toolkit";

export default {
  initialState: {},
  action: createAction("intention/setIntention"),
  reducers(state, { payload }) {
    state.intention[payload.id] = payload.value;
  },
};
