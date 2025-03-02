import http from "../../../http_common";

export const loadManufacturers = () => async (dispatch) => {
    try {  
      const response = await http.get(
        "Manufacturer/manufacturers"
      );
  
      const { data } = response;
      const manufacturers = data.payload;
      dispatch({ type: "LOAD_MANUFACTURERS", payload: manufacturers });
    } catch (error) {
      console.log("Manufacturers error", error);
    }
  };