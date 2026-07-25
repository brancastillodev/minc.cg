import { useParams } from "react-router-dom";
import { programming } from "../utils/programming";
import leftArrow from "../assets/programming/leftArrow.png";
import rightArrow from "../assets/programming/rightArrow.png";
import { useState, useEffect, useMemo } from "react";

function ArticleCard() {
  const { slug } = useParams();
  const article = programming.find(p => p.slug === slug);
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const paragraphsPerPage = 5; // 4 párrafos por página
  
  // Calcular total de páginas basado en los párrafos
  const totalPages = useMemo(() => {
    if (!article) return 1;
    return Math.ceil(article.body.length / paragraphsPerPage);
  }, [article]);
  
  // Calcular qué párrafos mostrar en la página actual
  const paragraphsToShow = useMemo(() => {
    if (!article) return [];
    
    const startIndex = (currentPage - 1) * paragraphsPerPage;
    const endIndex = startIndex + paragraphsPerPage;
    
    return article.body.slice(startIndex, endIndex);
  }, [article, currentPage]);
  
  // Resetear a página 1 cuando cambia el artículo
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);
  
  // Funciones para navegación
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [slug]);

  if (!article) return <p className="article-not-found simple-text">Article not found.</p>;

  return (
    <article className="article" key={article.id}>
      {/* title */}
      <figure className="article-title">
        <img src={article.title} alt={`article title for ${article.name}`} />
      </figure>

      {/* copete */}
      <section className="article-copete">
        <figure className="article-image">
          <img src={article.image} alt="article-image" />
        </figure>
        
        <p className="article-epigrafe simple-text">
          {article.epilogo.map((e, index) => (
            <span key={index}>
              {e}
              <br />
            </span>
          ))}
        </p>
      </section>

      {/* cuerpo - SOLO 4 párrafos por página */}
      <section className="article-body simple-text">
        {paragraphsToShow.map((paragraph, index) => {
          // Calcular el índice real en el array original
          const realIndex = (currentPage - 1) * paragraphsPerPage + index;
          
          return (
            <div key={`parrafo-${realIndex}`}>
              <p>{paragraph}</p>
              <br />
            </div>
          );
        })}
      </section>

      {/* Navegación de páginas */}
      <section className="arrow-section">
        <figure 
          onClick={goToPrevPage}
          className={currentPage === 1 ? "disabled" : "article-arrow"}
        >
          <img src={leftArrow} alt="Previous page" />
        </figure>
        
        <p className="simple-text">
          Page {currentPage} of {totalPages}
        </p>
        
        <figure 
          onClick={goToNextPage}
          className={currentPage === totalPages ? "disabled" : "article-arrow"}
        >
          <img src={rightArrow} alt="Next page" />
        </figure>
      </section>

    </article>
  );
}

export default ArticleCard;