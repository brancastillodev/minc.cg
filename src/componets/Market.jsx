import { useEffect, useState } from 'react'
import ItemCard from '../commons/ItemCard.jsx'
import marketTitle from "../assets/market/marketTitle.png"
import descriptionBox from "../assets/market/descriptBox.png"
import viewCart from "../assets/market/viewCart.png"
import soldBadge from "../assets/market/sold-badge.webp"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Market(){
  const [allProducts, setAllProducts] = useState([]);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://minc-cg-back.onrender.com/products"
        );
        setAllProducts(res.data);
        setWaiting(false)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return(
    <main className="content-page">
      <figure className="content-title-text">
        <img src={marketTitle} alt="market-title" />
      </figure>
      <section className="description-section">
        <figure className="description-box">
          <img src={descriptionBox} alt="market-title" />
        </figure>
        <Link>
          <figure className="view-cart snipcart-checkout">
            <img src={viewCart} alt="market-title" />
          </figure>
        </Link>
      </section>
      
      {waiting ? 
        <p  style={{marginTop: "1.5rem"}} className='simple-text waiting-msg'>Loading, please wait...</p>  :
      <div className='market-div'>
        <section className="market">
          {allProducts.length > 0 && allProducts.map((e, i)=>(
            <ItemCard key={i} itemData={e} />
          ))}
        </section>
      </div>
      }
    </main>
  )


}

export default Market;