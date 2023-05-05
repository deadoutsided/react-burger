import React, {FC, ReactNode} from "react";
import style from "./navigation-link.module.css";
import { NavLink } from "react-router-dom";

type TNavLinkProps = {
  text: string;
  children: ReactNode;
  flex: boolean;
  state?: {
    title: string;
  }
  to: string;
}

const NavigationLink: FC<TNavLinkProps> = ({ text, flex, state, to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text text_type_main-medium text_color_inactive " +
            " " +
            style.container +
            " " +
            style.link +
            " " +
            style.activeLink +
            " " +
            (flex ? "" : style.profileFlex) +
            " pl-5 pr-5 pt-4 pb-4"
          : "text text_type_main-medium text_color_inactive " +
            style.link +
            " " +
            style.container +
            " " +
            (flex ? "" : style.profileFlex) +
            " pl-5 pr-5 pt-4 pb-4"
      }
      state={state}
    >
      {children}
      <p className="text text_type_main-default pl-2">{text}</p>
    </NavLink>
  );
}

export default NavigationLink;
