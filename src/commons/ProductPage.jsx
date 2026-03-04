import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import viewCart from "../assets/market/viewCart.png"
import leftArrow from "../assets/programming/leftArrow.png";
import rightArrow from "../assets/programming/rightArrow.png";

function ProductPage(){
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.itemData || null);
  const [waiting, setWaiting] = useState(true);
  
  useEffect(() => {
    async function fetchProduct(){
      if(!product){
        try {
          const res = await axios.get(`https://minc-cg-back.onrender.com/products/${id}`); 
          setProduct(res.data);
          setWaiting(false)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }else{
        setWaiting(false)
      }
    }
    fetchProduct()
  }, []);


  return(
    <main className="content-page">
      {waiting ? 
      <p className='simple-text waiting-msg'>Loading, please wait...</p>
      :
      <section className="product-card">
        <div className="product-card__hero">
          <p className="product-card__title">{product.title}</p>
          <figure className="product-card__kart">
            <img src={viewCart} alt=""></img>
          </figure>
        </div>
        <figure className="product-card__image">
          <img src={product.image}></img>
        </figure>
        <div className="product-card__bottom">
        {product.size &&<p className="product-card__price">{product.size}: </p>}
        <p className="product-card__price">
          £{Math.trunc(product.price)}
        </p>
        </div>
        <div className="product-card__arrows">
          <figure className="left-arrow">
            <img src={leftArrow}></img>
          </figure>
          <figure className="right-arrow">
            <img src={rightArrow}></img>
          </figure>
        </div>
      </section> 
      }
    </main>
  )
}

export default ProductPage;