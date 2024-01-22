import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../models/article";
import { NewsState } from "../models/newsState";

const initialState: NewsState = {
  general: [],
  politics: [],
  business: [],
  tech: [],
  entertainment: [],
  sports: [],
  page: 1,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updatePage(state, action) {
      state.page = action.payload;
    },
    sortNews(state, action) {
      const payloadList: Article[] = action.payload;

      const generalList: Article[] = [],
        politicsList: Article[] = [],
        businessList: Article[] = [],
        techList: Article[] = [],
        entertainmentList: Article[] = [],
        sportsList: Article[] = [];

      payloadList.forEach((article) => {
        if (article.category1 == "general" || article.category2 == "general") {
          generalList.push(article);
        }
        if (
          article.category1 == "politics" ||
          article.category2 == "politics"
        ) {
          politicsList.push(article);
        }
        if (
          article.category1 == "business" ||
          article.category2 == "business"
        ) {
          businessList.push(article);
        }
        if (article.category1 == "tech" || article.category2 == "tech") {
          techList.push(article);
        }
        if (
          article.category1 == "entertainment" ||
          article.category2 == "entertainment"
        ) {
          entertainmentList.push(article);
        }
        if (article.category1 == "sports" || article.category2 == "sports") {
          sportsList.push(article);
        }
      });

      state.general = sortDates(generalList);
      state.politics = sortDates(politicsList);
      state.business = sortDates(businessList);
      state.tech = sortDates(techList);
      state.entertainment = sortDates(entertainmentList);
      state.sports = sortDates(sportsList);
    },
  },
});

function sortDates(someList: Article[]) {
  const newList = someList.sort((a, b) => {
    const c = +new Date(b.publishedAt);
    const d = +new Date(a.publishedAt);
    return c - d;
  });
  return newList;
}

export const { sortNews, updatePage } = newsSlice.actions;

export default newsSlice.reducer;
