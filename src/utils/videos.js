import img3 from "../assets/videos/sp_image@300x.webp";
import img5 from "../assets/videos/biri_pic@300x.webp";
import img6 from "../assets/videos/oisc_image@300x.webp";

import tit1 from "../assets/videos/inFlux_2.webp";
import tit2 from "../assets/videos/media.webp";
import tit3 from "../assets/videos/Sensory.webp";
import tit4 from "../assets/videos/knowledge.webp";
import tit5 from "../assets/videos/birindwa.webp";
import tit6 from "../assets/videos/OI_SC_1_2.webp";
import tit7 from "../assets/videos/ProductsOf.webp";

import vidChairDes from "../assets/videos/vidChairDes.webm";
import vidChairMob from "../assets/videos/vidChairMob.mov";

import vidNeckDes from "../assets/videos/vidNeckDes.webm";
import vidNeckMob from "../assets/videos/vidNeckMob.mov";

import vidPcDes from "../assets/videos/vidPcDes.webm";
import vidPcMob from "../assets/videos/vidPcMob.mov";

import vidShoeDes from "../assets/videos/vidShoeDes.webm";
import vidShoeMob from "../assets/videos/vidShoeMob.mov";


export const videos = [
  {
    anime: true,
    vidM: vidNeckMob,
    vidD: vidNeckDes,
    title: tit1,
    doubleLine: true,
    desc: "A visualiser for musician by the name kisito.",
    link: "https://www.youtube.com/watch?v=QHRHf0qTFfU"
  },
  {
    anime: true,
    vidM: vidShoeMob,
    vidD: vidShoeDes,
    title: tit2,
    doubleLine: false,
    desc: "A curated media collection.",
    link: "https://www.youtube.com/watch?v=mKruZdXavMk"
  },
  {
    anime: false,
    image: img3,
    title: tit3,
    doubleLine: false,
    desc: "The positive outcomes of sensory sensitivity with a focus on the visually orientated.",
    link: "https://www.youtube.com/watch?v=kkZh-s0jWPs"
  },
  {
    anime: true,
    vidM: vidPcMob,
    vidD: vidPcDes,
    title: tit4,
    doubleLine: false,
    desc: "The importance of shared information and it's impact on humanity on an individual and global scale.",
    link: "https://www.youtube.com/watch?v=Zu_-DoPFFuU"
  },
  {
    anime: false,
    image: img5,
    title: tit5,
    doubleLine: false,
    desc: "God Bless.",
    link: "https://www.youtube.com/watch?v=0yiRYy-h-Bs"
  },
  {
    anime: false,
    image: img6,
    title: tit6,
    doubleLine: true,
    desc: "The mind (software) / The body (hardware).",
    link: "https://www.youtube.com/watch?v=HduwPC2gnWQ"
  },
  {
    anime: true,
    vidM: vidChairMob,
    vidD: vidChairDes,
    title: tit7,
    doubleLine: false,
    desc: "Artifacts produced by humanity.",
    link: "https://www.youtube.com/watch?v=hHph-RUWexQ"
  },
]

export default videos;