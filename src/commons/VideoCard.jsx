import nikeShoe from "../assets/videos/MT_shoe@300x.webp"

function VideoCard({videoData}){

  return(
    <div className="video-card">
      <figure className="video-card__image">
        <img src={videoData.image} />
        {videoData.link=="https://www.youtube.com/watch?v=mKruZdXavMk"
        ? <div className="zapatito">
          <img src={nikeShoe}/></div>
        :<></>}
      </figure>
      
      <figure className={videoData.doubleLine ? "video-card__title" : "video-card__title"}>
        <a href={videoData.link} target="_blank">
          <img src={videoData.title}/>
        </a>
      </figure>

      <div className="video-card__desc">
        <p>{videoData.desc}</p>
      </div>
    </div>
  )
}

export default VideoCard;