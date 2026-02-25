import instagramIcon from "../assets/aboutus/instagram.png";
import globe from "../assets/logo/DTbadge_VP9.webm"
import globeMob from "../assets/logo/badge-1.mov"
import naming from "../assets/aboutus/namingFixed.png"

function AboutUs(){
  return (
    <main className="content-page about-us-page">
      <div className="about-us-page__video">
        <video loop muted autoPlay playsInline loading="lazy">
          <source src={globeMob} type='video/mp4; codecs="hvc1"'/>
          <source src={globe} type="video/webm"/>
        </video>
      </div>

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