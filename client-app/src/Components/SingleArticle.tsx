import { Link } from "react-router-dom";
import DownArrow from "../assets/DownArrow";
import { Article } from "../models/article";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
type Props = {
  article: Article;
};

const SingleArticle = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { article } = props;
  const { title, url, imageUrl, source, description, publishedAt } = article;
  dayjs.extend(utc);
  const fixedDate = dayjs(publishedAt)
    .local()
    .format("dddd MMM D @ h:mma")
    .toString();
  let adjustedTitle: string = title;
  if (title.length > 100) {
    adjustedTitle = title.substring(0, 100) + "...";
  }

  return (
    <div
      onMouseLeave={() => setExpanded(false)}
      className={`transition-all duration-200 overflow-hidden  ${
        expanded ? "h-fit sm:h-fit" : "h-28 sm:h-32"
      } `}
    >
      <div className="flex w-auto transition-all duration-200 border-2 border-solid rounded-lg h-28 sm:h-32">
        <div className="flex h-full rounded-lg ">
          <img src={`${imageUrl}`} className="w-64 sm:w-72 " />
        </div>
        <div className="relative flex flex-col justify-center w-full p-2">
          <h3 className="text-sm font-bold underline sm:text-base decoration-1 ">
            {adjustedTitle}
          </h3>
          <div className="inline">
            <Link
              className="transition-all duration-200 hover:text-blue-700"
              target="_blank"
              to={`${url}`}
            >
              {source}
            </Link>
          </div>
          <div className="absolute right-2 bottom-px">
            <button
              onClick={() => setExpanded((pastState) => !pastState)}
              className="transition-all duration-200 stroke-1 stroke-white sm:text-xl hover:bg-accent hover:stroke-black hover:text-white"
            >
              <DownArrow />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`border-x-2 border-b-2 flex  w-full flex-col bg-background min-h-fit`}
        role="menu"
      >
        <div className="font-bold">{description}</div>
        <div className="text-xs"> {fixedDate}</div>
      </div>
    </div>
  );
};
export default SingleArticle;
