import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import viewCart from "../assets/market/viewCart.png"
import addToCart from "../assets/market/addToCart2.png"
import leftArrow from "../assets/programming/leftArrow.png";
import rightArrow from "../assets/programming/rightArrow.png";

function ProductPage() {
  const API = import.meta.env.VITE_API_URL
  const { id } = useParams();
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
           
            {pos > 0 &&
              <figure onClick={() => { setPos(pos - 1) }} className="left-arrow">
                <img src={leftArrow}></img>
              </figure>
            }
            
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