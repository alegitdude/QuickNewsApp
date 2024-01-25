import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Configure,
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import IconNewsPaper from "../assets/IconNewsPaper";

import {
  updatePossiblePages,
  updateQuery,
  updateSearch,
} from "../state/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Reset from "../assets/Reset";
import { RootState } from "../state/store";
import { NewsState } from "../models/newsState";
import DotLoader from "../assets/DotLoader";

const SearchBar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const news: NewsState = useSelector((store: RootState) => store.news);

  useEffect(() => {
    setIsLoading(true);
    if (news.algoliaSearch) {
      setIsLoading(false);
    }
  }, [news.algoliaSearch]);

  const algoliaClient = algoliasearch("PG42VRDQ3Y", news.algoliaSearch);

  function AButton() {
    const theUrl = useLocation().pathname.substring(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { results } = useInstantSearch();

    return (
      <button
        onClick={() => {
          if (results.query != "") {
            dispatch(updateSearch(results.hits));
            dispatch(updatePossiblePages(results.nbPages));
            dispatch(updateQuery(results.query));
            if (theUrl != "search") {
              navigate("/search");
            }
          }
        }}
        id="search-submit"
        className="flex-none px-2 ml-1 text-sm font-semibold text-white rounded-md shadow-sm bg-primary hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <IconNewsPaper />
      </button>
    );
  }

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex justify-center w-72">
          <DotLoader />
        </div>
      ) : (
        <InstantSearch searchClient={algoliaClient} indexName="articles">
          <Configure hitsPerPage={500} page={1} />
          <div className="flex ">
            <CustomSearchBox />

            <AButton />
          </div>
        </InstantSearch>
      )}
    </div>
  );
};
export default SearchBar;

function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { results } = useInstantSearch();
  const theUrl = useLocation().pathname.substring(1);
  const navigate = useNavigate();

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        className="relative"
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (inputRef.current?.value != "") {
            dispatch(updateSearch(results.hits));
            dispatch(updatePossiblePages(results.nbPages));
            dispatch(updateQuery(results.query));
            if (theUrl != "search") {
              navigate("/search");
            }
          }

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery("");

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <input
          className="py-1 pl-4 pr-8 border-2 rounded-md border-accent"
          ref={inputRef}
          placeholder={"Search"}
          spellCheck={false}
          maxLength={200}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />

        <button
          type="reset"
          hidden={inputValue.length === 0}
          className="absolute right-[4%] top-[25%]"
        >
          {<Reset />}
        </button>
      </form>
    </div>
  );
}
