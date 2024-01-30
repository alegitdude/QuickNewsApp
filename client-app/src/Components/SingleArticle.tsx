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
      className={`transition-all duration-200 overflow-hidden shadow-sm ${
        expanded ? "h-fit sm:h-fit" : "h-28 sm:h-32"
      } `}
    >
      <div className="flex transition-all duration-200 border-2 border-solid rounded-lg h-28 sm:h-32">
        <div className="flex justify-center h-full rounded-l-lg overflow-hidden basis-4/12 bg-black min-w-[160px]">
          <Link
            className="flex justify-center overflow-hidden bg-black rounded-l-lg "
            target="_blank"
            to={`${url}`}
          >
            <img
              src={`${imageUrl}`}
              className="h-full  min-w-[180px] rounded-l-lg"
            />
          </Link>
        </div>
        <div className="relative flex flex-col justify-center min-w-[162px] p-2 basis-8/12">
          <Link
            className="text-center transition-all duration-200 hover:text-blue-700"
            target="_blank"
            to={`${url}`}
          >
            <h3 className="flex justify-center text-sm font-bold underline sm:text-base decoration-1 ">
              {adjustedTitle}
            </h3>
          </Link>
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
              className="p-[1px] text-white transition-all duration-200 bg-black rounded-xl sm:text-xl hover:bg-white hover:text-black"
            >
              <div className="flex gap-0 rounded-3xl">
                <div
                  className={`transition-all ease-in-out duration-500 ${
                    expanded ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <DownArrow />
                </div>
              </div>
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
