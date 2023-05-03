import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
})

const orderType = PropTypes.shape({
  _id: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  name: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  number: PropTypes.number,
})

export const orderDataType = PropTypes.shape({
  success: PropTypes.bool,
  orders: PropTypes.arrayOf(PropTypes.shape(orderType.isRequired)),
  total: PropTypes.number,
  totalToday: PropTypes.number
}).isRequired

export default ingredientType;