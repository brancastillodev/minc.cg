import './styles/app.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './commponets/Navbar';
import Footer from './commponets/Footer';
import Home from './commponets/Home';
import Videos from './commponets/Videos'
import Programming from './commponets/Programming'
import Market from './commponets/Market'
import AboutUs from './commponets/AboutUs'
import ArticleCard from './commons/ArticleCard';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isArticlePage = (
      location.pathname.startsWith('/programming/') && 
      location.pathname !== '/programming'
  ) || (
      location.pathname == '/market'
  )

  return (
    <div className={isArticlePage ? "wraper article-wrap" :'wraper'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programming/:slug" element={<ArticleCard />} />
        <Route path="/programming" element={<Programming/>}/>
        <Route path="/videos" element={<Videos />} />
        <Route path="/market" element={<Market/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
