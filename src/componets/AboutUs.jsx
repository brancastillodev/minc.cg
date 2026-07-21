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
        <img src={naming}></img>
      </figure>

       <section className="about-us-page__description">
        <p>A multidisciplinary studio producing stylised digital environments </p>
        <p>and a curated retail platform.</p>
      </section> 

      <figure className="instagram-link">
        <a href="https://www.instagram.com/minc.cg/" target="_blank">
            <img src={instagramIcon} />
        </a>
      </figure>

    </main>
  )

}

export default AboutUs;