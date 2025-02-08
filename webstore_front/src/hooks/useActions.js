import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import actions from "../store/reducers/actions_creator";

const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

export default useActions;