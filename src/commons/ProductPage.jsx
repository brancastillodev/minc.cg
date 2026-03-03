import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

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
        <p className='simple-text waiting-msg'>Loading, please wait...</p>  :
      <div className=''>
        <p>{product.title}</p>
      </div>
      }
    </main>
  )
}

export default ProductPage;