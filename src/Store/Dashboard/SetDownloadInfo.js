import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fields/setDownloadInfo'),
  reducers(state, { payload }) {
    state.downloadInfo = payload;
  },
}
