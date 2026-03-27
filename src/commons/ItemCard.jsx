import { Link } from "react-router-dom"
import AddCartButton from "./AddCartButton";


function ItemCard({itemData}){
  return(
    <div className="item-card">
      <Link state={{ itemData }}  className="item-card__link" to={`/market/${itemData.id}`}>
        <figure className="item-image"><img src={itemData.image}/></figure>
        <p className="item-title">{itemData.title}</p>
      </Link>

      <div className="item-size-price">
        {itemData.size == "Raffle Tickets" ? <div className="raffle-ticket">Raffle Tickets</div>
        : <p className="item-size-">{itemData.size}</p>}
        <p className="item-price">£{Math.trunc(itemData.price)}</p>
      </div>
      
      <div className="about-us add-to-cart">
        <AddCartButton product={itemData}/>
      </div>
    </div>

  )
}

export default ItemCard;