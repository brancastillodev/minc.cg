import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import viewCart from "../assets/market/viewCart.png"
import addToCart from "../assets/market/addToCart2.png"
import leftArrow from "../assets/programming/leftArrow.png";
import rightArrow from "../assets/programming/rightArrow.png";

function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.itemData || null);
  const [images, setImages] = useState(null);
  const [pos, setPos] = useState(0)
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      // if(!product){
      try {
        const res = await axios.get(`https://minc-cg-back.onrender.com/products/${id}`);
        setProduct(res.data);
        const res2 = await axios.get(`https://minc-cg-back.onrender.com/products/images/${id}`);
        setImages(res2.data);
        setWaiting(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      // }else{
      //   setWaiting(false)
      // }
    }
    fetchProduct()
  }, [id]);


  return (
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
            <img src={images[pos]}></img>
            {pos > 0 &&
              <figure onClick={() => { setPos(pos - 1) }} className="left-arrow">
                <img src={leftArrow}></img>
              </figure>
            }
            {pos < images.length - 1 &&
              <figure onClick={() => { setPos(pos + 1) }} className="right-arrow">
                <img src={rightArrow}></img>
              </figure>
            }
          </figure>


          <div className="product-card__bottom">
            {product.size && <p className="product-card__price">{product.size}: </p>}
            <p className="product-card__price">
              £{Math.trunc(product.price)}
            </p>
          </div>
          <div className="product-card__arrows">
            
          </div>
          <figure className="add-to-cart-btn">
            <img src={addToCart} alt={"add to cart button"}></img>
          </figure>
        </section>
      }
    </main>
  )
}

export default ProductPage;