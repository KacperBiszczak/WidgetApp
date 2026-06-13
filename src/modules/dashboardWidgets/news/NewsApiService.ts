import type {
    NewsApiResponse,
    NewsArticle,
    NewsCategory,
} from "./NewsApiTypes";

export class NewsApiService {
    private readonly baseUrl = "https://newsapi.org/v2";
    private readonly apiKey = "ef4a63eab4d944bf87f778b919eff44b";

    async getTopHeadlines(
        category: NewsCategory = "general",
        country = "us",
        pageSize = 5
    ): Promise<NewsArticle[]> {
        const url = new URL(`${this.baseUrl}/top-headlines`);

        url.searchParams.set("country", country);
        url.searchParams.set("category", category);
        url.searchParams.set("pageSize", pageSize.toString());

        const response = await fetch(url, {
            headers: {
                "X-Api-Key": this.apiKey,
            },
        });

        if (!response.ok) {
            throw new Error("Nie udało się pobrać wiadomości.");
        }

        const data = await response.json() as NewsApiResponse;

        return data.articles.map((article) => ({
            sourceName: article.source.name,
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
        }));
    }
}