export type NewsCategory =
    | "business"
    | "entertainment"
    | "general"
    | "health"
    | "science"
    | "sports"
    | "technology";

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsApiArticle[];
}

export interface NewsApiArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsArticle {
    sourceName: string;
    title: string;
    description: string | null;
    url: string;
    imageUrl: string | null;
    publishedAt: string;
}