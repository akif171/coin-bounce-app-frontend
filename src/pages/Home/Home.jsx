import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getNews } from "../../api/external";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      console.log(response);
      setArticles(response);
      console.log(articles);
    })();

    // cleanup function

    setArticles([]);
  }, []);

  const handleCardClick = async (url) => {
    window.open(url, "_blank");
  };

  if (articles.length == 0) {
    return <Loader text="homepage" />;
  }

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            className={styles.card}
            key={article.url}
            onClick={() => handleCardClick(article.url)}
          >
            <img src={article.urlToImage} alt="" />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
      I
    </>
  );
}

export default Home;
