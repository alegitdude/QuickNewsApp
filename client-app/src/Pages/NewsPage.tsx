import HeadLines from "../Components/HeadLines";
import { api } from "../Api/agent";
import { useEffect, useState } from "react";
import { sortNews } from "../state/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import NewsLoader from "../assets/NewsLoader";
import { RootState } from "../state/store";
import { UserState } from "../models/user";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

const { useArticleListQuery } = api;

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
    }
    setPageLoading(false);
    navigate("/general");
  }, [data, dispatch, isSuccess, navigate]);

  if (pageLoading || isLoading) {
    return (
      <div className="flex items-center justify-center grow">
        <ToastContainer transition={Zoom} limit={2} />
        <NewsLoader />
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return <div>Problem fetching the News</div>;
  }
  return <HeadLines />;
};
export default NewsPage;
