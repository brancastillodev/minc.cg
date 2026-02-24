

function VideoCard({videoData}){
  return(
    <div className="video-card">
      {videoData.anime ?
        <div className="video-card__video">
          <video loop muted autoPlay playsInline loading="lazy">
            <source src={videoData.vidM} type='video/mp4; codecs="hvc1"'/>
            <source src={videoData.vidD} type="video/webm"/>
          </video>
        </div> :
        
        <figure className="video-card__image">
          <img src={videoData.image} loading="lazy" />
        </figure>
      }

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