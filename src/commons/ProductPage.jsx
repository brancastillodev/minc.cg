import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import viewCart from "../assets/market/viewCart.png"
import addToCart from "../assets/market/addToCart2.png"
import leftArrow from "../assets/programming/leftArrow.png";
import rightArrow from "../assets/programming/rightArrow.png";
import AddCartButton from "./AddCartButton";

function ProductPage() {
  const API = import.meta.env.VITE_API_URL
  const {id} = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.itemData || null);
  const [images, setImages] = useState(null);
  const [pos, setPos] = useState(0)
  const [waiting, setWaiting] = useState(true);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setWaiting(true);

        if (product) {
          const imagesRes = await axios.get(`${API}/products/images/${id}`);
          setImages(imagesRes.data);

        } else {
          const [productRes, imagesRes] = await Promise.all([
            axios.get(`${API}/products/${id}`),
            axios.get(`${API}/products/images/${id}`)
          ]);

          setProduct(productRes.data);
          setImages(imagesRes.data);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setWaiting(false);
      }
    }

    fetchProduct();
  }, [id]);


  return (
    <main className="content-page product-page">
      {waiting ?
        <p className='simple-text waiting-msg'>Loading, please wait...</p>
        :
        <section className="product-card">
          <div className="product-card__hero">
            <p className="product-card__title">{product.title}</p>
            <figure className="product-card__kart snipcart-checkout">
              <img src={viewCart} alt=""></img>
            </figure>
          </div>
          
          <div className="product-card__image">
            <figure 
            onClick={() => { setPos(pos - 1) }}
            style={pos > 0 ? { visibility: "visible" } : { visibility: "hidden" }}
            className="arrow-desktop">
              <img src={leftArrow}></img>
            </figure>
            <figure className="product-card__jpg">
              <img
                loading="lazy"
                src={images[pos].replace("/upload/", "/upload/f_auto,q_auto,w_400/")}
                srcSet={`
                  ${images[pos].replace("/upload/", "/upload/f_auto,q_auto,w_400/")} 400w,
                  ${images[pos].replace("/upload/", "/upload/f_auto,q_auto,w_800/")} 800w
                `}
                sizes="(max-width: 600px) 400px, 800px"
                alt={product.title}
                onLoad={() => setLoaded(true)}
                style={{ opacity: loaded ? 1 : 0 }}
              />
            </figure>
            <figure 
            onClick={() => { setPos(pos + 1) }} 
            className="arrow-desktop"
            style={pos < images.length - 1 ? { visibility: "visible" } : { visibility: "hidden" }}  
            >     
              <img src={rightArrow}></img>
            </figure>
          </div>

          <div className="product-card__grid">
            <div className="product-card__grid-1">
              <p className="product-card__title">{product.title}</p>
            </div>

            <div className="product-card__grid-2">
              <figure className="product-card__kart snipcart-checkout">
                <img src={viewCart} alt=""></img>
              </figure>
            </div>

            <div className="product-card__grid-3">
              <p className="product-card__price">
                {product.size && `${product.size}: `}£{Math.trunc(product.price)}
              </p>
            </div>
            
            <div className="product-card__grid-4">
              <AddCartButton product={product}/>
            </div>
          </div>

          <div className="product-card__bottom">
            <figure 
            style={{ visibility: pos > 0 ? "visible" : "hidden" }} 
            onClick={() => { setPos(pos - 1) }} 
            className="arrow-mobile">
              <img src={leftArrow}></img>
            </figure>

            <div className="product-card__bottom__price">
              <p className="product-card__price">
                {product.size && `${product.size}: `}£{Math.trunc(product.price)}</p>
              <figure className="add-to-cart-btn">
                <AddCartButton product={product}/>
              </figure>
            </div>
            
            <figure 
            style={{ visibility: pos < images.length - 1 ? "visible" : "hidden" }} 
            onClick={() => { setPos(pos + 1) }} 
            className="arrow-mobile">
              <img src={rightArrow}></img>
            </figure>
          </div>
        </section>
      }
    </main>
  )
}

export default ProductPage;