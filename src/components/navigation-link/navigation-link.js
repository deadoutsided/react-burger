import React from "react";
import PropTypes from "prop-types";
import style from "./navigation-link.module.css";

function NavigationLink(props) {
  return (
    <div
      className={
        style.container +
        " " +
        (props.flex ? "" : style.profileFlex) +
        " pl-5 pr-5 pt-4 pb-4"
      }
    >
      {props.children}
      <p className="text text_type_main-default pl-2">{props.text}</p>
    </div>
  );
}

NavigationLink.propTypes = {
  text: PropTypes.string,
  children: PropTypes.object,
};

export default NavigationLink;
