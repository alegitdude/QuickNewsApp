import { Article } from "./article";

export interface NewsState {
  general: Article[];
  politics: Article[];
  business: Article[];
  tech: Article[];
  entertainment: Article[];
  sports: Article[];
  page: number;
  algoliaSearch: string;
}
