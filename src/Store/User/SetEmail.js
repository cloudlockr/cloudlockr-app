import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('user/setEmail'),
  reducers(state, { payload }) {
    state.email = payload;
  },
}
