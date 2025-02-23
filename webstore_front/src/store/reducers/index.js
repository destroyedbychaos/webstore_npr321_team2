import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import AuthReducer from "./authReducer";
import CartReducer from "./cartReducer";

export const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  cart: CartReducer,
});
