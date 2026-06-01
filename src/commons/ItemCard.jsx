import { Link } from "react-router-dom"
import AddCartButton from "./AddCartButton";
import sold from "../assets/market/sold-badge.webp"


function ItemCard({itemData}){
  return(
    <div className="item-card">
      <Link state={{ itemData }}  className="item-card__link" to={`/market/${itemData.id}`}>
        <figure className="item-image"><img src={itemData.image}/> 
          {!itemData.available &&<figure className="sold-badge"><img src={sold}/> </figure>}
        </figure>
        <p className="item-title">{itemData.title}</p>
      </Link>

      <div className="item-size-price">
        <p className="item-size-">{itemData.size}</p>
        <p className="item-price">£{Math.trunc(itemData.price)}</p>
      </div>
      
      <div className="about-us add-to-cart">
        <AddCartButton product={itemData}/>
      </div>
    </div>

  )
}

export default ItemCard;