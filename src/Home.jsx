import { useState } from "react"
import greetingsMsg from "./assets/home/greetings-home.webp"
import bar from "./assets/home/mobileHomeV4.webm"
import barMob from "./assets/home/mobileHomeV4-1.mov"
import leftCharacter from "./assets/home/DTLadyOri.webm"
import rightCharacter from "./assets/home/DTmanOri.webm"

function Home() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  return(
    <main className="welcome-page">
      <div className="home-figures figure-a">
        <video loop muted autoPlay>
          <source src={leftCharacter} type="video/webm"/>
          Your browser doesn't support animations :,
        </video>
      </div>

      <section className="greetings-section">
        <figure className="greetings-message">
          <img src={greetingsMsg}></img>
        </figure>
        {isMobile 
        ?
        <div className="home-animated-bar">
          <video loop muted autoPlay playsInline>
            <source src={barMob} type="video/quicktime"/>
            Your browser doesn't support animations :,
          </video>

        </div>
        : 
        <div className="home-animated-bar">
          <video loop muted autoPlay playsInline>
            <source src={bar}c type="video/webm"/>
            Your browser doesn't support animations :,
          </video>
        </div>
        }
      </section>
      
      <div className="home-figures figure-b">
        <video loop muted autoPlay >
          <source src={rightCharacter} type="video/webm"/>
          Your browser doesn't support animations :,
        </video>
      </div>

    </main>
  )
}

export default Home;