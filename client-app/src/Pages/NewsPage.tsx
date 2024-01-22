import HeadLines from "../Components/HeadLines";
import { api } from "../Api/agent";
import { useEffect, useState } from "react";
import { sortNews } from "../state/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import algoliasearch from "algoliasearch";
import { Article } from "../models/article";
import NewsLoader from "../assets/NewsLoader";
import { RootState } from "../state/store";
import { UserState } from "../models/user";
import { useNavigate } from "react-router-dom";

const { useArticleListQuery } = api;

const client = algoliasearch("PG42VRDQ3Y", "dcc5dbca14663457c3e13661fdd38749");
const index = client.initIndex("articles");

const NewsPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const user: UserState = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  let sources = "none";
  if (user.omittedSources.length > 0) {
    sources = user.omittedSources.join();
  }

  const { isLoading, isError, isSuccess, data, error } =
    useArticleListQuery(sources);
  const dispatch = useDispatch();

  useEffect(() => {
    setPageLoading(true);
    if (isSuccess) {
      dispatch(sortNews(data));
      const sortedData = reMapArticles(data);

      index
        .saveObjects(sortedData)
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    }
    setPageLoading(false);
    navigate("/general");
  }, [data, dispatch, isSuccess, navigate]);

  if (pageLoading || isLoading) {
    return (
      <div className="flex items-center justify-center grow">
        <NewsLoader />
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return <div>Problem fetching the News</div>;
  }
  return (
    <div>
      <HeadLines />
    </div>
  );
};
export default NewsPage;

function reMapArticles(someArray: Article[]) {
  const newArray = someArray.map((anArticle: Article) => {
    const newArticle = {
      objectID: anArticle.uuid,
      title: anArticle.title,
      description: anArticle.description,
      keywords: anArticle.keywords,
      snippet: anArticle.snippet,
      url: anArticle.url,
      imageUrl: anArticle.imageUrl,
      language: anArticle.language,
      publishedAt: anArticle.publishedAt,
      source: anArticle.source,
      category1: anArticle.category1,
      category2: anArticle.category2,
      relevanceScore: anArticle.relevanceScore,
      locale: anArticle.locale,
      topStory: anArticle.topStory,
    };
    return newArticle;
  });
  return newArray;
}
