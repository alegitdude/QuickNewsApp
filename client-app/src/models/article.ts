export interface Article {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  imageUrl: string;
  language: string;
  publishedAt: Date;
  source: string;
  category1: string;
  category2: string;
  relevanceScore: number;
  locale: string;
  topStory: boolean;
}

export type AlgoliaArticle = {
  objectID: string;
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  imageUrl: string;
  language: string;
  publishedAt: Date;
  source: string;
  category1: string;
  category2: string;
  relevanceScore: number;
  locale: string;
  topStory: boolean;
};
