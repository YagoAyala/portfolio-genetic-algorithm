import React from "react";

import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";

import NotificationCenter from "../components/NotificationCenter/NotificationCenter";

const Header = ({
  user,
  logout,
  onChangeModule,
}) => {
  const signOut = () => {
    logout(true);
  };

  return (
    <div id={"header"}>
      <span>
        <h1 onClick={() => onChangeModule("")}>LotoAI</h1>
      </span>
      <span className={"button-area"}>
        <button
          className={"icon"}
          title={"Perfil"}
          onClick={() => onChangeModule("PROFILE")}
        >
          <BiSolidUserCircle />
          {user?.username &&
            <p>{user.username}</p>
          }
        </button>

        <button
          className={"icon"}
          title={"Configurações"}
          onClick={() => onChangeModule("SETTINGS")}
        >
          <IoMdSettings />
        </button>

        <NotificationCenter />

        <button
          className={"icon logout"}
          title={"Sair"}
          onClick={() => signOut()}
        >
          <MdOutlineLogout />
        </button>
      </span>
    </div>
  );
};

export default Header;
