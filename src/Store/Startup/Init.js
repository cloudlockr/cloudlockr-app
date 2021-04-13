import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from "@thecodingmachine/redux-toolkit-wrapper";
import { navigateAndSimpleReset } from "@/Navigators/Root";

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions("startup/init", async (args, { dispatch }) => {
    // Display the logo splash screen for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate and reset to the main navigator
    navigateAndSimpleReset("Main");
  }),
  reducers: buildAsyncReducers({ itemKey: null }),
};
