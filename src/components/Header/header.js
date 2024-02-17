import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBookmark } from "@fortawesome/free-regular-svg-icons";
import "./header.css";
import {
  faShoppingBag,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <>
      <nav className="navbar-container">
        <div className="header-container">
          <h1>TANN TRIM</h1>
          <div className="icon-container">
            <FontAwesomeIcon className="icons" icon={faSearch} />
            <FontAwesomeIcon className="icons" icon={faBookmark} />
            <FontAwesomeIcon className="icons" icon={faUser} />
            <FontAwesomeIcon className="icons" icon={faShoppingBag} />
          </div>
        </div>
        <ul className="header-menu-list">
          <li>Jewelery</li>
          <li>Gifting</li>
          <li>Accesories</li>
          <li>Travel</li>
          <li>Bags</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
