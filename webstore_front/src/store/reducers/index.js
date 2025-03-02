import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import AuthReducer from "./authReducer";
import ManufacturerReducer from "./manufacturerReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    auth: AuthReducer,
    manufacturer: ManufacturerReducer
});