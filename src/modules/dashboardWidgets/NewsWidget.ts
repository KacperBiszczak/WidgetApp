import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import type { NewsCategory } from "./news/NewsApiTypes";
import { DashboardWidget } from "./DashboardWidget";
import { NewsApiService } from "../dashboardWidgets/news/NewsApiService";

export class NewsWidget extends DashboardWidget {
    private newsEl: HTMLElement | undefined;
    private readonly newsApiService = new NewsApiService();

    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = async (): Promise<void> => {
        if (!this.widgetEl) return;

        this.widgetEl.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = this.config.title || "Wiadomości";

        const settingsButton = document.createElement("button");
        settingsButton.textContent = "⚙️";

        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("hidden");

        const categorySelect = document.createElement("select");

        const categories: NewsCategory[] = [
            "general",
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
        ];

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        categorySelect.value = this.config.newsCategory ?? "general";

        settingsContainer.append(categorySelect);

        settingsButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        categorySelect.addEventListener("change", async () => {
            this.setConfig({
                newsCategory: categorySelect.value as NewsCategory,
            });

            await this.updateNews();

            settingsContainer.classList.add("hidden");
        });

        this.newsEl = document.createElement("div");
        this.newsEl.classList.add("news-container")

        this.widgetEl.append(
            title,
            settingsButton,
            settingsContainer,
            this.newsEl
        );

        await this.updateNews();
    };

    private updateNews = async (): Promise<void> => {
        if (!this.newsEl) return;

        const category = this.config.newsCategory ?? "general";
        const country = this.config.newsCountry ?? "us";

        this.newsEl.innerHTML = "Ładowanie wiadomości...";

        try {
            const articles = await this.newsApiService.getTopHeadlines(
                category,
                country,
                5
            );

            this.newsEl.innerHTML = "";

            articles.forEach((article) => {
                const articleEl = document.createElement("article");
                articleEl.classList.add("news-article");

                const link = document.createElement("a");
                link.href = article.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = article.title;

                const source = document.createElement("small");
                source.textContent = article.sourceName;

                articleEl.append(link, source);

                if (article.description) {
                    const description = document.createElement("p");
                    description.textContent = article.description;
                    articleEl.appendChild(description);
                }

                this.newsEl?.appendChild(articleEl);
            });
        } catch (error) {
            this.newsEl.innerHTML =
                error instanceof Error
                    ? error.message
                    : "Wystąpił błąd podczas pobierania wiadomości.";
        }
    };
}