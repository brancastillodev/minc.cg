import instagramIcon from "./assets/aboutus/instagram.png";
import globeIcon from "./assets/aboutus/globe.png";
import description from "./assets/aboutus/descriptionFixed.png"
import naming from "./assets/aboutus/namingFixed.png"

function AboutUs(){
  return (
    <main className="content-page about-us-page">
      <figure className="aboutus-world">
        <img src={globeIcon} loading="lazy" alt="Global reach icon" />
      </figure>
      {/* 
      <section className="simple-text about-us-credits">
        <p><span className="yellow">Name: </span> 
        <span className="minc-title">CGC MINC</span></p>
        <p><span className="yellow">Know as: </span> 
        <span className="">MINC</span></p>
        <p><span className="yellow">Also know as: </span> 
        <span className="">MINC.CG / M.INC</span></p>
      </section>*/}

      <figure className="about-us-page__naming">
        <img src={naming} alt="naming-of-creator"></img>
      </figure>

       <section className="about-us-page__description">
        <p>Art & Design Studio . Observatory . Science Facility . Social Research Institute </p>
        <p>Global Network . Documentation . Distribution . Programming .</p>
      </section> 

      <figure className="instagram-link">
        <a href="https://www.instagram.com/minc.cg/" target="_blank">
            <img src={instagramIcon} alt="Instagram integration icon" />
        </a>
      </figure>

    </main>
  )

}

export default AboutUs;