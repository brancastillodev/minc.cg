import aboutUs from "../assets/home/aboutUsText.png"
import menuBox from "../assets/buttons/oneBoxShadow.png"
import menuBoxSel from "../assets/buttons/menuBoxesShadowSel.png"
import { Link, useLocation } from "react-router-dom"

function Footer() {
  const location = useLocation();
  const isAboutUsPage = location.pathname === "/about-us";
  
  return(
    <footer className={isAboutUsPage ? "disabled" : ""}>
      <div className="about-us">
        <figure>
          <img src={aboutUs} alt="About Us" />
        </figure>
        <Link to="/about-us" className={`about-us-link ${isAboutUsPage ? "disabled-link" : ""}`}>
          <figure className="about-us-box">
            <img src={menuBox} alt="Menu box" />
          </figure>
          <figure className="about-us-sel-box">
            <img src={menuBoxSel} alt="Selected menu box" />
          </figure>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;