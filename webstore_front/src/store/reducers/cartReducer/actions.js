import http from "../../../http_common";

export const getCartItems = () => async (dispatch) => {
  try {
    const response = await http.get("cartItems");
    dispatch({ type: "GET_ALL_CART_ITEMS", payload: response.data });
  } catch (error) {
    console.error("Getting cart items failed", error);
  }
};

export const getCartItemsByUserId = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await http.get(`cartItems/user/${userId}`);
    dispatch({ type: "GET_CART_ITEMS_BY_USER_ID", payload: response.data });
  } catch (error) {
    console.error("Getting cart items failed", error);
  }
};

export const createCartItem = (cartItem) => async (dispatch) => {
  try {
    const response = await http.post("cartItems", cartItem);
    dispatch({ type: "ADD_CART_ITEM", payload: response.data });
    return { success: true, message: "Cart item added successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Message ||
      "An error occurred while adding the cart item";
    return { success: false, message: errorMessage };
  }
};

export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
  try {
    await http.put(`cartItems/${cartItemId}`, { quantity });
    dispatch({ type: "UPDATE_CART_ITEM_QUANTITY", payload: { id: cartItemId, quantity } });
    return { success: true, message: "Cart item updated successfully" };
  } catch (error) {
    let errorMessage = "An error occurred during cart item update.";
    if (error.response) {
      if (error.response.data?.title) {
        errorMessage = error.response.data.title;
      } else if (typeof error.response.data === "string") {
        errorMessage = error.response.data;
      }
    }
    console.error("Error updating cart item:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const deleteCartItemById = (cartItemId) => async (dispatch) => {
  try {
    await http.delete(`cartItems/${cartItemId}`);
    dispatch({ type: "DELETE_CART_ITEM", payload: { id: cartItemId } });
    return { success: true, message: "Cart item deleted successfully" };
  } catch (error) {
    console.error("Deleting cart item failed", error);
    return { success: false, message: "Failed to delete cart item" };
  }
};