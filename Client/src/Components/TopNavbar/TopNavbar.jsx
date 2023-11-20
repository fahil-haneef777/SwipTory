import React from "react";
import style from "./TopNavbar.module.css";
import { useState, useContext } from "react";
import bookmarks from "../../assets/bookmarks.png";
import profilephoto from "../../assets/profilephoto.svg";
import menu from "../../assets/menu.png";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../logout/Logout";
import AllContext from "../../Context/Context";
function TopNavbar() {
  const [showlogin, setshowlogin] = useState(false);
  const [showregister, setshowregister] = useState(false);
  const [showlogout, setshowlogout] = useState(false);

  const { loggedin, setloggedin } = useContext(AllContext);

  const onmenuclick = () => {
    setshowlogout(!showlogout);
  };

  const onclicklogin = () => {
    setshowlogin(!showlogin);
  };

  const onclickregister = () => {
    setshowregister(!showregister);
  };

  return (
    <div className={style.navbar}>
      <h2 className={style.heading}>SwipTory</h2>

      <div>
        {!loggedin ? (
          <div className={style.buttons}>
            <button className={style.Registerbutton} onClick={onclickregister}>
              Register Now
            </button>
            <button className={style.Loginbutton} onClick={onclicklogin}>
              Login
            </button>
          </div>
        ) : (
          <div className={style.afterlogginbutton}>
            <button className={style.Bookmarkbutton}>
              <img src={bookmarks} alt="bookmark" />
              <p>Bookmarks</p>
            </button>
            <button className={style.Addstorybutton}>Add Story</button>
            <img src={profilephoto} alt="profile pic" />
            <img
              className={style.sidemenu}
              src={menu}
              alt="menu"
              onClick={onmenuclick}
            />
          </div>
        )}
      </div>
      {showlogin ? <Login onclicklogin={onclicklogin} /> : ""}
      {showregister ? <Register onclickregister={onclickregister} /> : ""}
      {showlogout ? <Logout onmenuclick={onmenuclick} /> : ""}
    </div>
  );
}

export default TopNavbar;
