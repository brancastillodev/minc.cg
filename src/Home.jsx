import greetingsMsg from "./assets/home/greetings2.webp"
import barA from "./assets/home/whiteBarAnimated.webm"
import bar from "./assets/home/whiteBar@300x.webp"
import leftCharacter from "./assets/home/characterLeft.webp"
import rightCharacter from "./assets/home/characterRight.webp"

function Home() {
  return(
    <main className="welcome-page">
      <figure className="home-figures figure-a">
          <img src={leftCharacter}></img>
      </figure>
      <section className="greetings-section">
        <figure className="greetings-message">
          <img src={greetingsMsg}></img>
        </figure>
        <figure className="home-char-bar">
          <img src={bar}></img>
        </figure> 
        {/* INTENTO DE PONER ANIMACIONES
        <video autoPlay muted loop playsInline className="home-char-bar">
          <source src={barA} type="video/webm"></source>
        </video> */}
      </section>
      <figure className="home-figures figure-b">
          <img src={rightCharacter}></img>
      </figure>
    </main>
  )
}

export default Home;