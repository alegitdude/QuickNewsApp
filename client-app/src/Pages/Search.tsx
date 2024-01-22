import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import SearchResult from "../Components/SearchResult";
import { SearchState } from "../models/search";
import { AlgoliaArticle } from "../models/article";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const Search = () => {
  const search: SearchState = useSelector((store: RootState) => store.search);
  const { query } = search;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
    const highlighted = Array.from(
      document.getElementsByClassName("react-paginate")
    )[0];
    if (highlighted) {
      const someLis = highlighted
        .getElementsByTagName("li")[1]
        .getElementsByTagName("a")[0];
      someLis.click();
    }
  }, [query]);

  const start = (page - 1) * 25;
  const finish = (page - 1) * 25 + 24;

  type IEventOject = {
    selected: number;
  };

  function handlePageChange(e: IEventOject) {
    setPage(e.selected + 1);
  }

  const someResults = search.searchResults.slice(start, finish);
  const pages = Math.ceil(search.searchResults.length / 25);

  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="flex h-12 mt-8 text-2xl underline">
        Results for {`"${query}"`}
      </div>
      <div className="flex flex-col w-11/12 gap-2">
        {someResults.map((article: AlgoliaArticle) => {
          return <SearchResult article={article} key={article.uuid} />;
        })}
      </div>
      {search.searchResults.length > 1 ? (
        <div className="mt-10">
          <ReactPaginate
            pageLinkClassName="bg-primary w-8"
            previousLabel={"Prev"}
            initialPage={1}
            className="react-paginate"
            pageCount={pages}
            onPageChange={(e) => handlePageChange(e)}
          />
        </div>
      ) : (
        <div>
          <h1 className="mt-10 text-3xl">Sorry, no results were found</h1>
        </div>
      )}
    </div>
  );
};
export default Search;
