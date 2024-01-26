import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeadlineArticle from "./HeadlineArticle";
import { Article } from "../models/article";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NewsState } from "../models/newsState";

import SingleArticle from "./SingleArticle";
import { ToastContainer, Zoom } from "react-toastify";

const HeadLines = () => {
  const [fetchedNews, setFetchedNews] = useState<Article[]>();
  const theUrl = useLocation().pathname;
  const news: NewsState = useSelector((store: RootState) => store.news);

  useEffect(() => {
    switch (theUrl.substring(1, theUrl.length)) {
      case "general":
        setFetchedNews(news.general);
        break;
      case "politics":
        setFetchedNews(news.politics);
        break;
      case "business":
        setFetchedNews(news.business);
        break;
      case "tech":
        setFetchedNews(news.tech);
        break;
      case "sports":
        setFetchedNews(news.sports);
        break;
      case "entertainment":
        setFetchedNews(news.entertainment);
        break;
    }
  }, [theUrl, news]);

  const slicedNews = fetchedNews?.slice(0, 9);

  if (fetchedNews) {
    return (
      <div className="flex flex-col items-center m-4">
        <ToastContainer transition={Zoom} limit={2} />
        <div>
          <h1 className="mb-4 text-3xl">Breaking</h1>
        </div>
        <div className="relative grid gap-0 mb-4 sm:gap-4 grid-col-1 sm:grid-cols-2 md:grid-cols-3 w-7/8 h">
          {slicedNews?.map((oneArticle) => {
            return (
              <HeadlineArticle article={oneArticle} key={oneArticle.uuid} />
            );
          })}
        </div>

        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4 ">
          {fetchedNews.slice(10).map((article) => {
            return (
              <div className="h-fit" key={article.uuid}>
                <SingleArticle article={article} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default HeadLines;
