import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

import NavbarItem from "./NavbarItem";
import "./style.css";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userUrl = `/highscores/${user.id}`;
  return (
    <>
      <NavbarItem
        style={{ fontWeight: "bold" }}
        path={userUrl}
        linkText={`${user.name}'s Highscores`}
      />

      <button className="LogButton" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </>
  );
}
