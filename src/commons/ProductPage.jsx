import { useLocation, useParams } from "react-router-dom";

function ProductPage(){
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const { id } = useParams();

  const [waiting, setWaiting] = useState(true);
  
  useEffect(() => {
    async function fetchProduct(){
      if(!product){
        try {
          const res = await axios.get(
            "https://minc-cg-back.onrender.com/products/:id"
          );
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
    <></>

  )
}

export default ProductPage;