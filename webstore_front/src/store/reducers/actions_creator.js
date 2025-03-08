import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as manufacturerActions from "./manufacturerReducer/actions";
import * as categoryActions from "./categoryReducer/actions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...manufacturerActions,
    ...categoryActions,
};

export default actions;