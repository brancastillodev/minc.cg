import { useState} from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/CGCmincLogo.webp"
import menuButton from "../assets/buttons/menuBttn@300x.png"
import menuLine from "../assets/buttons/menuLine.svg"
import pButton from "../assets/buttons/proBttn@300x.png"
import vButton from "../assets/buttons/VidBttn@300x.png"
import mButton from "../assets/buttons/markBttn@300x.png"
import newButton from "../assets/buttons/new@300x.png"
import menuBar from "../assets/buttons/menuBar.png"
import menuBox from "../assets/buttons/oneBoxShadow.png"
import menuBoxSel from "../assets/buttons/menuBoxesShadowSel.png"


function Navbar() {
    const [extraMenu, setExtraMenu] = useState(false);

    return(
      <>
        <nav className='navbar'>
          <Link to="/" className='navbar-logotipo' onClick={()=>setExtraMenu(false)}>
              <img src={logo}></img>
          </Link>
          
          {/* MENU DESKTOP */}
          <div className="menu-desktop">
            <figure className="menu-desktop-bar">
              <img src={menuBar}></img>
            </figure>

            <Link to="/programming" className="menu-link box-1">
                <figure className="menu-single-box box-1 box-not-sel"><img src={menuBox} alt="" /></figure>
                <figure className="menu-single-box box-1 box-sel"><img src={menuBoxSel} alt="" /></figure>
            </Link>
            <Link to="/videos" className="menu-link box-1">
                <figure className="menu-single-box box-2"><img src={menuBox} alt="" /></figure>
                <figure className="menu-single-box box-2 box-sel"><img src={menuBoxSel} alt="" /></figure>
            </Link>
            <Link to="/market" className="menu-link box-1">
                <figure className="menu-single-box box-3"><img src={menuBox} alt="" /></figure>
                <figure className="menu-single-box box-3 box-sel"><img src={menuBoxSel} alt="" /></figure>
            </Link>
          </div>
         
         {/* MENU MOBILE */}
          <figure className="menu-mobile-button">
            <img onClick={()=>setExtraMenu(!extraMenu)} src={menuButton}></img>
            <figure  className={extraMenu ? "navbar-menu-line" : "menu-closed"}>
              <img src={menuLine}></img>
            </figure>  
          </figure>
        </nav>

        {/* EXTRA MENU MOBILE */}
        <div className={extraMenu ? "extra-menu" : "menu-closed"}>
          <div className="extra-menu-buttons-div">
            <Link to={"/programming"} onClick={()=>setExtraMenu(!extraMenu)}>
              <figure className="navbar-extra-button">
                <img src={pButton}></img>
              </figure>
            </Link>
            <Link to={"/videos"} onClick={()=>setExtraMenu(!extraMenu)}>
              <figure className="navbar-extra-button">
                <img src={vButton}></img>
              </figure>
            </Link>
            <figure className="navbar-extra-button new-button-div">
              <Link to={"/market"} onClick={()=>setExtraMenu(!extraMenu)}>
                <img src={mButton}></img>
              </Link>
              <figure className="new-button">
                <img src={newButton}></img>
              </figure>
            </figure>
          </div>
        </div>

      </>
    )
}

export default Navbar;