import './styles/app.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import Home from './componets/Home';
import Videos from './componets/Videos'
import Programming from './componets/Programming'
import Market from './componets/Market'
import AboutUs from './componets/AboutUs'
import ArticleCard from './commons/ArticleCard';
import ProductPage from './commons/ProductPage';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CartPage from './componets/CartPage';

function App() {
  const location = useLocation();
  const [footer, setFooter] = useState(true)

  const isArticlePage = (
      location.pathname.startsWith('/programming/') && 
      location.pathname !== '/programming'
  ) || (
      location.pathname == '/market'
  )

  useEffect(()=>{
    if(location.pathname.startsWith("/market/")){
      setFooter(false)
    }else{
      setFooter(true)
    }
  },[location.pathname])

  return (
    <div className={isArticlePage ? "wraper article-wrap" :'wraper'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programming/:slug" element={<ArticleCard />} />
        <Route path="/programming" element={<Programming/>}/>
        <Route path="/videos" element={<Videos />} />
        <Route path="/market" element={<Market/>}/>
        <Route path="/market/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
      {footer && <Footer/>}
    </div>
  )
}

export default App;
