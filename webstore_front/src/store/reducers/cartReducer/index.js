const initialState = {
    cartItemList: [],
  };
  
  const СartItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_CART_ITEMS":
        return { ...state, cartItemList: action.payload };
  
      case "GET_CART_ITEMS_BY_USER_ID":
        return { ...state, cartItemList: action.payload };
  
      case "ADD_CART_ITEM":
        return { ...state, cartItemList: [...state.cartItemList, action.payload] };
  
      case "UPDATE_CART_ITEM_QUANTITY":
        return {
          ...state,
          cartItemList: state.cartItemList.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
  
      case "DELETE_CART_ITEM":
        return {
          ...state,
          cartItemList: state.cartItemList.filter(
            (item) => item.id !== action.payload.id
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default СartItemReducer;