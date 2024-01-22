import { Link } from "react-router-dom";
import { Article } from "../models/article";
type Props = {
  article: Article;
};

const HeadlineArticle = (props: Props) => {
  const { article } = props;

  const { title, url, imageUrl, source } = article;

  let adjustedTitle: string = title;
  if (title.length > 100) {
    adjustedTitle = title.substring(0, 100) + "...";
  }

  return (
    <div className="flex w-full mb-2 text-sm border-2 border-solid rounded-lg h-28 sm:w-56 sm:flex-col sm:h-60 lg:h-64 lg:text-base border-secondary lg:w-72 ">
      <div className="flex items-center min-w-[143px] justify-center rounded-lg basis-6/12 sm:basis-2/5 ">
        <img src={`${imageUrl}`} className="w-full h-28 lg:h-36 " />
      </div>
      <div className="flex w-full h-full min-w-[203px]">
        <div className="flex flex-col justify-center p-2 ">
          <h3 className="font-bold text-center underline decoration-1">
            {adjustedTitle}
          </h3>
          <Link
            className="text-center underline hover:text-blue-600"
            to={`${url}`}
            target="_blank"
          >
            {source}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HeadlineArticle;
