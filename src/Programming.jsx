import { Link } from "react-router-dom"
import {programming} from "./utils/programming"
import programTitle from "./assets/programming/programTitle.png"
import introProgam from "./assets/programming/BoxNewVersion.png"
// import globe from "./assets/programming/globe.webp"
import globe from "../src/assets/logo/DTbadge_VP9.webm"
import globeMob from "../src/assets/logo/badge-1.mov"

function Programming(){
  return(
    <main className="content-page">
      <figure className="content-title-text programming-title">
        <img src={programTitle} alt="programming-title" />
      </figure>

      <figure className="programming-description">
        <img src={introProgam} alt="market-title" />
      </figure>

      <div className="programming-video">
        <video loop muted autoPlay playsInline loading="lazy">
          <source src={globeMob} type='video/mp4; codecs="hvc1"'/>
          <source src={globe} type="video/webm"/>
        </video>
      </div>

      <div className="articles-menu-grid">
        {programming.map(e =>(
          <div className="articles-menu-one-option" key={e.id}>
            <figure className="article-image-select">
              <img src={e.image} alt="union-black-flag" />
            </figure> 

            <Link key={e.id} to={`/programming/${e.slug}`}>
              <figure className="article-title-select">
                <img src={e.titleSelected} alt="union-black-flag" />
              </figure>
            </Link>
            
            <div className="simple-text article-description-select">{
              e.epilogoSelected.split("\n\n").map((paragraph, index) => 
              (<>
              <p key={index}>{paragraph}</p>
              <br/>
              </>))}
            </div>
          </div>
        ))}
      </div>
      

    </main>
  )
}

export default Programming;