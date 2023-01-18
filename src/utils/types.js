import PropTypes from "prop-types";

const ingredientType = {
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
  __v: PropTypes.string
}

export default ingredientType;