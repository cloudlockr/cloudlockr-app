import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('fields/removeField'),
  reducers(state, { payload }) {
    if (state.fields.hasKey(payload.id)) {
      delete this.state.fields[payload.id];
    }
  },
}
