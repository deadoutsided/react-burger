import React from "react";
import PropTypes from "prop-types";
import style from "./navigation-link.module.css";

class NavigationLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          style.container +
          " " +
          (this.props.flex ? "" : style.profileFlex) +
          " pl-5 pr-5 pt-4 pb-4"
        }
      >
        {this.props.children}
        <p className="text text_type_main-default pl-2">{this.props.text}</p>
      </div>
    );
  }
}

NavigationLink.propTypes = {
  text: PropTypes.string,
  chikdren: PropTypes.elementType,
};

export default NavigationLink;
