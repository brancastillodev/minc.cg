import greetingsMsg from "../assets/home/greetings-home.webp"
import bar from "../assets/home/mobileHomeV4.webm"
import barMob from "../assets/home/mobileHomeV4-1.mov"
import safariGirl from "../assets/home/safariGirl_VP9.webm"
import safariBoy from "../assets/home/safariBoy_VP9.webm"
import starGirl from "../assets/home/star-girl.png"
import starBoy from "../assets/home/star-boy.png"


function Home() {

  return(
    <main className="welcome-page">

      <div className="figures-contenedor">
        <figure className="fondo-a">
          <img src={starGirl} alt="star-for-characters" loading="lazy" />
        </figure>
        <div className="home-figures figure-a">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={safariGirl} type="video/webm"/>
          </video>
        </div>
      </div>

      <section className="greetings-section">
        <figure className="greetings-message" loading="lazy">
          <img src={greetingsMsg}></img>
        </figure>
        <div className="home-animated-bar">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={barMob} type='video/mp4; codecs="hvc1"'/>
            <source src={bar} type="video/webm"/>
          </video>
        </div>
      </section>

      <div className="figures-contenedor">
        <figure className="fondo-b">
          <img src={starBoy} alt="star-for-characters" loading="lazy" />
        </figure>
        <div className="home-figures figure-b">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={safariBoy} type="video/webm"/>
          </video>
        </div>
      </div>

    </main>
  )
}

export default Home;