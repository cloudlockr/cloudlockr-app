import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('user/token/setToken'),
  reducers(state, { payload }) {
    state.token.userId = payload.userId;
    state.token.refreshToken = payload.refreshToken;
    state.token.accessToken = payload.accessToken;
    state.token.tokenType = payload.token_type;
  },
}
