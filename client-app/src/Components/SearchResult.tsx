import { Link } from "react-router-dom";
import { AlgoliaArticle } from "../models/article";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

type Props = {
  article: AlgoliaArticle;
};
const SearchResult = (props: Props) => {
  const { imageUrl, title, source, description, url, publishedAt } =
    props.article;
  dayjs.extend(utc);
  const fixedDate = dayjs(publishedAt)
    .local()
    .format("MMM D @ h:mma")
    .toString();

  return (
    <div className={" border-2 border-solid rounded-lg  "}>
      <div className="flex w-auto h-28 sm:h-32">
        <div className="flex ">
          <img src={`${imageUrl}`} className=" w-60 sm:w-72" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="relative flex flex-col justify-center w-full p-2 lg:justify-end basis-4/5 lg:basis-2/5">
            <Link
              className="transition-all duration-200 hover:text-blue-700"
              target="_blank"
              to={`${url}`}
            >
              <h3 className="text-sm font-bold underline sm:text-base decoration-1">
                {title.length > 90 ? title.slice(0, 90) + "..." : title}
              </h3>
            </Link>
          </div>

          <div className="items-center justify-center hidden px-4 lg:flex basis-2/5">
            {description.length > 150
              ? description.slice(0, 130) + "..."
              : description}
          </div>
          <div className="flex items-start justify-center mb-2 ml-4 text-xs sm:items-end basis-1/5">
            <Link
              className="transition-all duration-200 hover:text-blue-700"
              target="_blank"
              to={`${url}`}
            >
              {source} -
            </Link>
            {fixedDate}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
