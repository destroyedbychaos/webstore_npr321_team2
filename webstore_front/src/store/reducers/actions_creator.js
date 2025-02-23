import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as cartActions from "./cartReducer/actions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...cartActions
};

export default actions;