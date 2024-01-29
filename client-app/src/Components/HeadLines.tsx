import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeadlineArticle from "./HeadlineArticle";
import { Article } from "../models/article";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NewsState } from "../models/newsState";

import SingleArticle from "./SingleArticle";
import { ToastContainer, Zoom } from "react-toastify";
import {
  BusinessIcon,
  EntertainmentIcon,
  GeneralIcon,
  PoliticsIcon,
  SportsIcon,
  TechIcon,
} from "../assets/Index";

const HeadLines = () => {
  const [fetchedNews, setFetchedNews] = useState<Article[]>();
  const [imageNumber, setImageNumber] = useState<number>(60);
  const [iconVariable, setIconVariable] = useState<JSX.Element>(
    <GeneralIcon />
  );
  const theUrl = useLocation().pathname;
  const news: NewsState = useSelector((store: RootState) => store.news);

  useEffect(() => {
    setImageNumber(60);
    switch (theUrl.substring(1, theUrl.length)) {
      case "general":
        setFetchedNews(news.general);
        setIconVariable(<GeneralIcon />);
        break;
      case "politics":
        setFetchedNews(news.politics);
        setIconVariable(<PoliticsIcon />);
        break;
      case "business":
        setFetchedNews(news.business);
        setIconVariable(<BusinessIcon />);
        break;
      case "tech":
        setFetchedNews(news.tech);
        setIconVariable(<TechIcon />);
        break;
      case "sports":
        setFetchedNews(news.sports);
        setIconVariable(<SportsIcon />);
        break;
      case "entertainment":
        setFetchedNews(news.entertainment);
        setIconVariable(<EntertainmentIcon />);
        break;
    }
  }, [theUrl, news]);

  const slicedNews = fetchedNews?.slice(0, 9);

  if (fetchedNews) {
    return (
      <div className="flex flex-col items-center m-4">
        <ToastContainer transition={Zoom} limit={2} />
        <div className="flex">
          <h1 className="mb-4 text-3xl">Breaking - </h1>
          <div className="ml-2 text-4xl"> {iconVariable}</div>
        </div>
        <div className="relative grid gap-0 mb-4 sm:gap-4 grid-col-1 sm:grid-cols-2 md:grid-cols-3 w-7/8 h">
          {slicedNews?.map((oneArticle) => {
            return (
              <HeadlineArticle article={oneArticle} key={oneArticle.uuid} />
            );
          })}
        </div>

        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4 ">
          {fetchedNews.slice(10, imageNumber).map((article) => {
            return (
              <div className="h-fit" key={article.uuid}>
                <SingleArticle article={article} />
              </div>
            );
          })}
        </div>
        <button
          className={`flex-none transition-all rounded-md bg-primary my-10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            imageNumber == fetchedNews.length ? "hidden" : ""
          }`}
          onClick={() => {
            if (fetchedNews.length - 10 > imageNumber + 50) {
              setImageNumber((imageNumber) => imageNumber + 50);
            } else {
              setImageNumber(() => fetchedNews.length);
            }
          }}
        >
          Load more
        </button>
      </div>
    );
  }
};
export default HeadLines;
