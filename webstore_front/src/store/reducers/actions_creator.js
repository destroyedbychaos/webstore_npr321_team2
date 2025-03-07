import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as manufacturerActions from "./manufacturerReducer/actions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...manufacturerActions,
};

export default actions;