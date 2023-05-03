import request from "../../utils/data";

export const INGREDIENT_REQUEST = "INGREDIENT_REQUEST";
export const INGREDIENT_SUCCESS = "INGREDIENT_SUCCESS";
export const INGREDIENT_FAILED = "INGREDIENT_FAILED";


const getIngredientDataRequest = async () => {
  return await request("ingredients");
};

export function getIngredientData() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENT_REQUEST,
    });
    getIngredientDataRequest()
      .then((res) => {
        dispatch({
          type: INGREDIENT_SUCCESS,
          value: res.data,
        });
      })
      .catch(
        dispatch({
          type: INGREDIENT_FAILED,
        })
      );
  };
}