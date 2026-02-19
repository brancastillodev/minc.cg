import { useState } from "react"
import greetingsMsg from "./assets/home/greetings-home.webp"
import bar from "./assets/home/mobileHomeV4.webm"
import barMob from "./assets/home/mobileHomeV4-1.mov"
import safariGirl from "./assets/home/safariGirl_VP9.webm"
import safariBoy from "./assets/home/safariboy_VP9.webm"

function Home() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  return(
    <main className="welcome-page">

      <div className="figure-a"></div>
      <div className="home-figures figure-a">
        <video loop muted autoPlay loading="lazy">
          <source src={safariGirl} type="video/webm"/>
          Your browser doesn't support animations :,
        </video>
      </div>

      <section className="greetings-section">
        <figure className="greetings-message" loading="lazy">
          <img src={greetingsMsg}></img>
        </figure>
        {isMobile 
        ?
        <div className="home-animated-bar">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={barMob} type="video/quicktime"/>
            Your browser doesn't support animations :,
          </video>

        </div>
        : 
        <div className="home-animated-bar">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={bar} type="video/webm"/>
            Your browser doesn't support animations :,
          </video>
        </div>
        }
      </section>
      
      <div className="figure-b"></div>
      <div className="home-figures">
        <video loop muted autoPlay loading="lazy">
          <source src={safariBoy} type="video/webm"/>
          Your browser doesn't support animations :,
        </video>
      </div>

    </main>
  )
}

export default Home;