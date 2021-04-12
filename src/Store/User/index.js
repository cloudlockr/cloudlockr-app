import { buildSlice } from "@thecodingmachine/redux-toolkit-wrapper";
import initialState from "@/Store/initialState";
import SetToken from "@/Store/User/SetToken";
import SetEmail from "@/Store/User/SetEmail";

export default buildSlice("user", [SetToken, SetEmail], {
  email: initialState.user.email,
  token: initialState.user.token,
}).reducer;

export { SetToken, SetEmail };
