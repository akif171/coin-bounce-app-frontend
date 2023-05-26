import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log(NEWS_API_KEY);

console.log(process.env.REACT_APP_INTERNAL_API_PATH);
console.log(process.env.REACT_APP_NEWS_API_KEY);

// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=blockchain AND business AND technology&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;

const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

const CRYPTO_API_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

export const getNews = async () => {
  let response;
  try {
    response = await axios.get(NEWS_API_ENDPOINT);
    response = response.data.articles.slice(0, 15);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return response;
};

export const getCrypto = async () => {
  let response;

  try {
    response = await axios.get(CRYPTO_API_ENDPOINT);

    response = response.data;
  } catch (error) {
    console.log(error);
  }

  return response;
};
