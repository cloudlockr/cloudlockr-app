import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fields/setField'),
  reducers(state, { payload }) {
    state.fields[payload.id] = payload.value
  },
}
