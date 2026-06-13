import type {
    IDashboardWidgetConfig,
    QuoteProviderType,
} from "./IDashboardWidgetConfig";
import { DashboardWidget } from "./DashboardWidget";
import type { IQuoteProvider } from "./quote/IQuoteProvider";
import { QuotableQuoteProvider } from "./quote/QuotableQuoteProvider";
import { CustomQuoteProvider } from "./quote/CustomQuoteProvider";

export class QuoteWidget extends DashboardWidget {
    private quoteEl: HTMLElement | undefined;
    private readonly customQuoteProvider = new CustomQuoteProvider();

    private readonly providers: IQuoteProvider[] = [
        new QuotableQuoteProvider(),
        this.customQuoteProvider,
    ]

    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = async (): Promise<void> => {
        if (!this.widgetEl) return;

        this.widgetEl.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = this.config.title || "Cytat";

        const settingsButton = document.createElement("button");
        settingsButton.textContent = "⚙️";

        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("hidden");

        const providerSelect = document.createElement("select");

        this.providers.forEach(provider => {
            const option = document.createElement("option");

            option.value = provider.providerName;
            option.textContent = provider.providerName;

            providerSelect.appendChild(option);
        });

        providerSelect.value = this.config.quoteProvider ?? "quotable";

        providerSelect.addEventListener("change", async () => {
            this.setConfig({
                quoteProvider: providerSelect.value as QuoteProviderType,
            });

            await this.invalidate();

            settingsContainer.classList.add("hidden");
        });

        // Formularz własnego cytatu
        const customQuoteTextInput = document.createElement("input");
        customQuoteTextInput.type = "text";
        customQuoteTextInput.placeholder = "Treść cytatu";

        const customQuoteAuthorInput = document.createElement("input");
        customQuoteAuthorInput.type = "text";
        customQuoteAuthorInput.placeholder = "Autor";

        const addCustomQuoteButton = document.createElement("button");
        addCustomQuoteButton.textContent = "Dodaj własny cytat";

        addCustomQuoteButton.addEventListener("click", async () => {
            const text = customQuoteTextInput.value.trim();
            const author = customQuoteAuthorInput.value.trim();

            if (!text) return;

            this.customQuoteProvider.addQuote({
                quote: text,
                author: author || "Nieznany autor",
            });

            this.setConfig({
                quoteProvider: this.customQuoteProvider.providerName,
            });

            providerSelect.value = this.customQuoteProvider.providerName;

            customQuoteTextInput.value = "";
            customQuoteAuthorInput.value = "";

            await this.updateQuote();
        });

        const refreshButton = document.createElement("button");
        refreshButton.textContent = this.isCustomProviderSelected()
            ? "Następny cytat"
            : "Losuj cytat";

        refreshButton.addEventListener("click", async () => {
            await this.updateQuote();
        });

        settingsButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        settingsContainer.append(providerSelect, customQuoteTextInput, customQuoteAuthorInput, addCustomQuoteButton);

        this.quoteEl = document.createElement("div");
        this.quoteEl.classList.add("quote-content");

        this.widgetEl.append(
            title,
            settingsButton,
            settingsContainer,
            this.quoteEl,
            refreshButton
        );

        await this.updateQuote();
    };

    private getSelectedProvider(): IQuoteProvider {

        const providerName =
            this.config.quoteProvider ??
            this.providers[0].providerName;

        return (
            this.providers.find(
                p => p.providerName === providerName
            ) ?? this.providers[0]
        );
    }

    private isCustomProviderSelected(): boolean {
        return this.getSelectedProvider() === this.customQuoteProvider;
    }

    private updateQuote = async (): Promise<void> => {
        if (!this.quoteEl) return;

        const provider = this.getSelectedProvider();

        this.quoteEl.textContent = "Ładowanie cytatu...";

        try {
            const quote = provider === this.customQuoteProvider ? await this.customQuoteProvider.getNextQuote() : await provider.getRandomQuote();

            this.quoteEl.innerHTML = "";

            const text = document.createElement("p");
            text.textContent = `"${quote.quote}"`;

            const author = document.createElement("small");
            author.textContent = `— ${quote.author}`;

            this.quoteEl.append(text, author);
        } catch {
            this.quoteEl.textContent = "Nie udało się pobrać cytatu.";
        }
    };
}