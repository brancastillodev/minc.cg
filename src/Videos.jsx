import videoTit from "./assets/videos/title.webp"
import videos from "./utils/videos.js"
import VideoCard from './commons/VideoCard.jsx'

function Videos() {
  return (
    <main className="content-page">
      <figure className="content-title-text">
        <img src={videoTit} alt="video-title" />
      </figure>

      <section className="videos">
       {videos.map((e)=>(
          <VideoCard videoData={e} />
       ))}
      </section>
    </main>
  )
}

export default Videos;
