import { useState,useRef,useEffect} from "react";
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
    const menuBoxRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el click NO es en el menú Y NO es en el botón → cerrar
      if (
        menuBoxRef.current && 
        !menuBoxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setExtraMenu(false);
      }
    };

    // Solo agregar el listener si el menú está abierto (optimización)
    if (extraMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [extraMenu]); 

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
          <figure ref={buttonRef} className="menu-mobile-button">
            <img onClick={()=>setExtraMenu(!extraMenu)} src={menuButton}></img>
            <figure  className={extraMenu ? "navbar-menu-line" : "menu-closed"}>
              <img src={menuLine}></img>
            </figure>  
          </figure>
        </nav>

        {/* EXTRA MENU MOBILE */}
        <div ref={menuBoxRef}  className={extraMenu ? "extra-menu" : "menu-closed"}>
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