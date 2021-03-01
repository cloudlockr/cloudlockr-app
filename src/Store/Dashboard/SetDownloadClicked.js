import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('dashboard/setDownloadClicked'),
  reducers(state, { payload }) {
    if (typeof payload  === "boolean") {
      state.downloadClicked = payload;
    }
  },
}
