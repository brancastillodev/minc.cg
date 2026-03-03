import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ProductPage(){
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const { id } = useParams();
  const [waiting, setWaiting] = useState(true);
  

  console.log(id)
  console.log(product)

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
      }
    }
    fetchProduct()
  }, []);


  return(
    <main className="content-page">
    {waiting ? 
        <p className='simple-text waiting-msg'>Loading, please wait...</p>  :
      <div className=''>
        {/* <p>{product.title}</p> */}
      </div>
      }
    </main>
  )
}

export default ProductPage;