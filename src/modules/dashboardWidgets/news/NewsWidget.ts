import type { IDashboardWidgetConfig } from "../IDashboardWidgetConfig";
import type { NewsCategory } from "./NewsApiTypes";
import { DashboardWidget } from "../DashboardWidget";
import { NewsApiService } from "./NewsApiService";

export class NewsWidget extends DashboardWidget {
    private newsEl: HTMLElement | undefined;
    private readonly newsApiService = new NewsApiService();
    private articles: Awaited<ReturnType<NewsApiService["getTopHeadlines"]>> = [];
    private currentArticleIndex = 0;

    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = async (): Promise<void> => {
        if (!this.widgetEl) return;

        this.widgetEl.innerText = "";
        this.widgetMenuEl?.querySelector(".widgetSettings")?.remove();

        if(this.widgetEl && this.widgetHeaderEl){
            this.widgetEl.appendChild(this.widgetHeaderEl);
        }

        const settingsButton = document.createElement("div");
        settingsButton.classList.add("widgetSettings");
        settingsButton.innerHTML = '<span class="material-symbols-rounded">settings</span>';
        this.widgetMenuEl?.appendChild(settingsButton);

        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("hidden", "settingsForm");

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

        const closeButton = document.createElement("button");
        closeButton.classList.add("settingsFormClose");
        closeButton.textContent = "Zamknij";

        closeButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        const buttons = document.createElement("div");
        buttons.classList.add("settingsFormButtons");
        
        buttons.append(closeButton);


        settingsContainer.append(categorySelect, buttons);

        settingsButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        categorySelect.addEventListener("change", async () => {
            this.setConfig({
                newsCategory: categorySelect.value as NewsCategory,
            });

            this.currentArticleIndex = 0;
            await this.loadNews();

            settingsContainer.classList.add("hidden");
        });

        this.newsEl = document.createElement("div");
        this.newsEl.classList.add("widgetNews")

        const nextNewsButton = document.createElement("button");
        nextNewsButton.innerText = "Następna wiadomość"
        
        nextNewsButton.addEventListener("click", () => {this.showNextNews()});

        this.widgetEl.append(
            settingsContainer,
            this.newsEl,
            nextNewsButton
        );

        await this.loadNews();
    };

    private loadNews = async (): Promise<void> => {
        if (!this.newsEl) return;

        const category = this.config.newsCategory ?? "general";
        const country = this.config.newsCountry ?? "us";

        this.newsEl.innerHTML = "Ładowanie wiadomości...";

        try {
            this.articles = await this.newsApiService.getTopHeadlines(
                category,
                country,
                10
            );

            this.currentArticleIndex = 0;

            this.renderCurrentNews();
        } catch (error) {
            this.newsEl.innerHTML =
                error instanceof Error
                    ? error.message
                    : "Wystąpił błąd podczas pobierania wiadomości.";
        }
    };

    private showNextNews = (): void => {
        if (this.articles.length === 0) return;

        this.currentArticleIndex++;

        if (this.currentArticleIndex >= this.articles.length) {
            this.currentArticleIndex = 0;
        }

        this.renderCurrentNews();
    };

    private renderCurrentNews = (): void => {
        if (!this.newsEl) return;

        this.newsEl.replaceChildren();

        if (this.articles.length === 0) {
            this.newsEl.textContent = "Brak wiadomości do wyświetlenia.";
            return;
        }

        const article = this.articles[this.currentArticleIndex];

        const articleEl = document.createElement("article");
        articleEl.classList.add("widgetNewsArticle");

        const link = document.createElement("a");
        link.href = article.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = article.title;

        const source = document.createElement("small");
        source.textContent = article.sourceName;

        articleEl.append(link, source);

        // if (article.description) {
        //     const description = document.createElement("p");
        //     description.textContent = article.description;
        //     articleEl.appendChild(description);
        // }

        this.newsEl.appendChild(articleEl);
    };
}