import { createAction } from "@reduxjs/toolkit";

export default {
  initialState: {},
  action: createAction("fileTransfer/setDetails"),
  reducers(state, { payload }) {
    state.details = payload;
  },
};
